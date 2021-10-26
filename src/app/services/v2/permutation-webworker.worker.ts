/// <reference lib="webworker" />

import {buildDb} from "../../data/database";
import {ArmorSlot, Permutation} from "../../data/permutation";
import {IInventoryArmor} from "../IInventoryArmor";
import {PERMUTATION_PACKAGE} from "../../data/constants";
import {Configuration} from "../../data/configuration";

const db = buildDb(async () => {
})
const inventoryArmor = db.table("inventoryArmor");

addEventListener('message', async ({data}) => {
  console.group("WebWorker: Permuation Builder")
  console.time("WebWorker: Permuation Builder")
  const config = data.config as Configuration;
  let items = await inventoryArmor.where("clazz").equals(data.clazz).toArray() as IInventoryArmor[]
  const helmets = items.filter(i => i.slot == "Helmets")
  const gauntlets = items.filter(i => i.slot == "Arms")
  const chests = items.filter(i => i.slot == "Chest")
  const legs = items.filter(i => i.slot == "Legs")

  let permutations: Permutation[] = [];
  for (let helmet of helmets) {
    if (!config.ignoreArmorAffinitiesOnMasterworkedItems && config.fixedArmorAffinities[ArmorSlot.ArmorSlotHelmet] != 0
      && helmet.masterworked && config.fixedArmorAffinities[ArmorSlot.ArmorSlotHelmet] != helmet.energyAffinity) continue;

    // HALLOWEEN SPECIAL
    if (config.eventHalloweenOnlyUseMask) {
      if (
        helmet.hash != 2545426109 // warlock
        && helmet.hash != 199733460 // Titan
        && helmet.hash != 3224066584 // Hunter
      ) continue;
    }
    // /HALLOWEEN SPECIAL

    if (config.disabledItems.indexOf(helmet.itemInstanceId) > -1) continue;

    for (let gauntlet of gauntlets) {
      if (!config.ignoreArmorAffinitiesOnMasterworkedItems && config.fixedArmorAffinities[ArmorSlot.ArmorSlotGauntlet] != 0
        && gauntlet.masterworked && config.fixedArmorAffinities[ArmorSlot.ArmorSlotGauntlet] != gauntlet.energyAffinity) continue;
      if (config.disabledItems.indexOf(gauntlet.itemInstanceId) > -1) continue;
      if (helmet.isExotic && gauntlet.isExotic) continue;

      for (let chest of chests) {
        if (!config.ignoreArmorAffinitiesOnMasterworkedItems && config.fixedArmorAffinities[ArmorSlot.ArmorSlotChest] != 0
          && chest.masterworked && config.fixedArmorAffinities[ArmorSlot.ArmorSlotChest] != chest.energyAffinity) continue;
        if (config.disabledItems.indexOf(chest.itemInstanceId) > -1) continue;
        if ((helmet.isExotic || gauntlet.isExotic) && chest.isExotic) continue;

        for (let leg of legs) {
          if (!config.ignoreArmorAffinitiesOnMasterworkedItems && config.fixedArmorAffinities[ArmorSlot.ArmorSlotLegs] != 0
            && leg.masterworked && config.fixedArmorAffinities[ArmorSlot.ArmorSlotLegs] != leg.energyAffinity) continue;
          if (config.disabledItems.indexOf(leg.itemInstanceId) > -1) continue;
          if ((helmet.isExotic || gauntlet.isExotic || chest.isExotic) && leg.isExotic) continue;

          let exoticId = 0;
          let exoticPosition = 0; // none
          if (helmet.isExotic) {
            exoticId = helmet.hash;
            exoticPosition = 1;
          } else if (gauntlet.isExotic) {
            exoticId = gauntlet.hash;
            exoticPosition = 2;
          } else if (chest.isExotic) {
            exoticId = chest.hash;
            exoticPosition = 3;
          } else if (leg.isExotic) {
            exoticId = leg.hash;
            exoticPosition = 4;
          }

          const stats: [number, number, number, number, number, number] = [
            helmet.mobility + gauntlet.mobility + chest.mobility + leg.mobility,
            helmet.resilience + gauntlet.resilience + chest.resilience + leg.resilience,
            helmet.recovery + gauntlet.recovery + chest.recovery + leg.recovery,
            helmet.discipline + gauntlet.discipline + chest.discipline + leg.discipline,
            helmet.intellect + gauntlet.intellect + chest.intellect + leg.intellect,
            helmet.strength + gauntlet.strength + chest.strength + leg.strength,
          ]

          let masterworkNumber = ((helmet.masterworked ? 1 : 0) << 3)
            + ((gauntlet.masterworked ? 1 : 0) << 2)
            + ((chest.masterworked ? 1 : 0) << 1)
            + (leg.masterworked ? 1 : 0)
            + (exoticPosition << 4) // Add exotic position. This can be used to determine whether an item is exotic

          // elemental affinity is at max 5. This means, we can simply shift by 3 bits to store them in one int.
          let elementalAffinity = (helmet.energyAffinity << 9)
            + (gauntlet.energyAffinity << 6)
            + (chest.energyAffinity << 3)
            + (leg.energyAffinity)

          // IDs are really really long..
          // So I store them in 4 parts
          permutations.push([
            [helmet.id, gauntlet.id, chest.id, leg.id],
            stats,
            exoticId,
            masterworkNumber,
            elementalAffinity
          ])
        }
      }
    }
  }


  // prepare to send it
  let len = (PERMUTATION_PACKAGE.WIDTH * permutations.length) * 4
  const buffer = new ArrayBuffer(len)
  const view = new Uint32Array(buffer);
  for (let i = 0; i < permutations.length; i++) {
    for (let n = 0; n < 4; n++)
      view[i * PERMUTATION_PACKAGE.WIDTH + PERMUTATION_PACKAGE.HELMET_ID + n] = permutations[i][0][n]
    for (let n = 0; n < 6; n++)
      view[i * PERMUTATION_PACKAGE.WIDTH + PERMUTATION_PACKAGE.MOBILITY + n] = permutations[i][1][n]
    view[i * PERMUTATION_PACKAGE.WIDTH + PERMUTATION_PACKAGE.EXOTIC_ID] = permutations[i][2] ?? 0;
    view[i * PERMUTATION_PACKAGE.WIDTH + PERMUTATION_PACKAGE.MASTERWORK_NUMBER] = permutations[i][3];
    view[i * PERMUTATION_PACKAGE.WIDTH + PERMUTATION_PACKAGE.ELEMENTAL_AFFINITIES] = permutations[i][4];
  }
  console.log(`Sending ${permutations.length} permutations in ${len} bytes.`)


  console.timeEnd("WebWorker: Permuation Builder")
  console.groupEnd()

  postMessage(view.buffer, [view.buffer]);
});