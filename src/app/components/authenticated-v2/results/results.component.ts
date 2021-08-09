import {Component, OnInit, ViewChild} from '@angular/core';
import {InventoryService} from "../../../services/v2/inventory.service";
import {DatabaseService} from "../../../services/database.service";
import {MatTableDataSource} from "@angular/material/table";
import {IMappedGearPermutation, MOD_INDICES} from "../../authenticated/main/main.component";
import {BungieApiService} from "../../../services/bungie-api.service";
import {CharacterClass} from "../../../data/enum/character-Class";
import {ConfigurationService} from "../../../services/v2/configuration.service";
import {ArmorStat, STAT_MOD_VALUES, StatModifier} from "../../../data/enum/armor-stat";
import {ModInformation} from "../../../data/ModInformation";
import {ModOrAbility} from "../../../data/enum/modOrAbility";
import {EnumDictionary} from "../../../data/types/EnumDictionary";
import {Modifier} from "../../../data/modifier";
import {IInventoryArmor} from "../../../services/IInventoryArmor";
import {Stats} from "../../../data/permutation";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export function getSkillTier(stats: number[]) {
  return Math.floor(Math.min(100, stats[ArmorStat.Mobility]) / 10)
    + Math.floor(Math.min(100, stats[ArmorStat.Resilience]) / 10)
    + Math.floor(Math.min(100, stats[ArmorStat.Recovery]) / 10)
    + Math.floor(Math.min(100, stats[ArmorStat.Discipline]) / 10)
    + Math.floor(Math.min(100, stats[ArmorStat.Intellect]) / 10)
    + Math.floor(Math.min(100, stats[ArmorStat.Strength]) / 10)
}


type ResultDefinition = {
  mods: number[];
  stats: number[];
  items: number[];
  tiers: number;
  modCost: number;
  modCount: number;
  loaded: boolean;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  ArmorStat = ArmorStat;

  private _results: Uint16Array = new Uint16Array();
  private _permutations: Uint32Array = new Uint32Array();
  private _config_assumeMasterworked: Boolean = false;
  private _config_enabledMods: ModOrAbility[] = [];

  tableDataSource = new MatTableDataSource<ResultDefinition>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  expandedElement: ResultDefinition | null = null;
  shownColumns = ["exotic", "mobility", "resilience", "recovery", "discipline", "intellect", "strength", "tiers", "mods", "dropdown",]
  //shownColumns = ["mobility"]

  selectedClass: CharacterClass = CharacterClass.None;
  private _items: Map<number, IInventoryArmor> = new Map<number, IInventoryArmor>();

  constructor(private inventory: InventoryService, private db: DatabaseService,
              private bungieApi: BungieApiService, private config: ConfigurationService) {

  }

  ngOnInit(): void {
    this.config.configuration.subscribe(c => {
      this.selectedClass = c.characterClass;
      this._config_assumeMasterworked = c.assumeMasterworked;
      this._config_enabledMods = c.enabledMods;
    })

    this.inventory.armorResults.subscribe(async value => {
      this._results = value.results;
      this._permutations = value.permutations;
      await this.updateData();
    })

    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'Mobility':
          return data.stats[ArmorStat.Mobility]
        case 'Resilience':
          return data.stats[ArmorStat.Resilience]
        case 'Recovery':
          return data.stats[ArmorStat.Recovery]
        case 'Discipline':
          return data.stats[ArmorStat.Discipline]
        case 'Intellect':
          return data.stats[ArmorStat.Intellect]
        case 'Strength':
          return data.stats[ArmorStat.Strength]
        case 'Tiers':
          return data.tiers
        case 'Mods':
          return 100 * data.modCount + data.modCost
      }
      return 0;
    }

  }

  async updateData() {
    //this.data = []
    //this.tableDataSource.data = []
    let data: any[] = []
    let itemsToGrab = new Set<number>();
    for (let i = 0; i < this._results.length; i += 7) {
      let entry = this._results.subarray(i, i + 7)
      const entryPermutationPosition = 12 * (entry[0] + (entry[1] << 16));
      let modList = Array.from(entry.subarray(2, 7));
      let permutation = this._permutations.subarray(entryPermutationPosition, entryPermutationPosition + 12)
      let items = ({
        stats: [2, 2, 2, 2, 2, 2],
        modCount: modList.length,
        modCost: modList.reduce((p, d: StatModifier) => p + STAT_MOD_VALUES[d][2], 0),
        tiers: 0,
        loaded: false,
        mods: [
          modList.filter
          (a => a == StatModifier.MINOR_MOBILITY || a == StatModifier.MAJOR_MOBILITY).length,
          modList.filter(a => a == StatModifier.MINOR_RESILIENCE || a == StatModifier.MAJOR_RESILIENCE).length,
          modList.filter(a => a == StatModifier.MINOR_RECOVERY || a == StatModifier.MAJOR_RECOVERY).length,
          modList.filter(a => a == StatModifier.MINOR_DISCIPLINE || a == StatModifier.MAJOR_DISCIPLINE).length,
          modList.filter(a => a == StatModifier.MINOR_INTELLECT || a == StatModifier.MAJOR_INTELLECT).length,
          modList.filter(a => a == StatModifier.MINOR_STRENGTH || a == StatModifier.MAJOR_STRENGTH).length,
        ],
        items: Array.from(permutation.subarray(0, 4))
      }) as ResultDefinition

      for (let configEnabledMod of this._config_enabledMods) {
        for (let bonus of ModInformation[configEnabledMod].bonus) {
          items.stats[bonus.stat] += bonus.value;
        }
      }

      for (let modId of modList) {
        let smd = STAT_MOD_VALUES[modId as StatModifier]
        if (!!smd && smd[1] != 0) {
          items.stats[smd[0]] += smd[1]
        }
      }

      for (let n = 0; n < 4; n++) {
        if (!this._items.has(items.items[n]))
          itemsToGrab.add(items.items[n])
      }
      data.push(items)
    }

    // Load data async
    new Promise(async resolve => {
      const keys = Array.from(itemsToGrab);
      let items = await this.db.inventoryArmor.bulkGet(keys)
      for (let keyid in keys) {
        if (items[keyid] != undefined)
          this._items.set(keys[keyid], items[keyid] as IInventoryArmor);
      }

      for (let di = 0; di < data.length; di += 500) {
        new Promise(resolve1 => {

          // now fetch the item names
          for (let i = di; i < di + 500; i++) {
            if (i >= data.length) break;
            data[i].items = data[i].items.map((e: number) => {
                let instance = this._items.get(e);
                if (!instance) return e;
                if (instance?.isExotic) {
                  data[i].exoticUrl = instance.icon;
                }

                if (instance?.masterworked || this._config_assumeMasterworked)
                  for (let n = 0; n < 6; n++)
                    data[i].stats[n] += 2;


                data[i].stats[ArmorStat.Mobility] += instance?.mobility;
                data[i].stats[ArmorStat.Resilience] += instance?.resilience;
                data[i].stats[ArmorStat.Recovery] += instance?.recovery;
                data[i].stats[ArmorStat.Discipline] += instance?.discipline;
                data[i].stats[ArmorStat.Intellect] += instance?.intellect;
                data[i].stats[ArmorStat.Strength] += instance?.strength;

                return {
                  exotic: instance?.isExotic || false,
                  itemInstanceId: instance?.itemInstanceId,
                  name: instance?.name,
                  masterworked: instance?.masterworked,
                  stats: [
                    instance?.mobility, instance?.resilience, instance?.recovery,
                    instance?.discipline, instance?.intellect, instance?.strength
                  ]
                }
              }
            )
            data[i].tiers = getSkillTier(data[i].stats)
            data[i].loaded = true;
          }
        })
      }


      resolve(true);
    })

    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.data = data;
  }


  async movePermutationItems(characterId: string, element: IMappedGearPermutation) {
    for (let item of element.permutation.items) {
      (item as any)["parseStatus"] = 1;
    }

    for (let item of element.permutation.items) {
      (item as any)["parseStatus"] = 1;
      await this.bungieApi.transferItem(item.itemInstanceId, characterId);
      (item as any)["parseStatus"] = 2;
    }
    for (let item of element.permutation.items) {
      delete (item as any)["parseStatus"];
    }
  }

}