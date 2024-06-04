/*
 * Copyright (c) 2023 D2ArmorPicker by Mijago.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { EnumDictionary } from "./types/EnumDictionary";
import { ModOrAbility } from "./enum/modOrAbility";
import { Modifier } from "./modifier";
import { ModifierType } from "./enum/modifierType";
import { ArmorStat, SpecialArmorStat } from "./enum/armor-stat";
import { DestinyEnergyType } from "bungie-api-ts/destiny2/interfaces";

export const ModInformation: EnumDictionary<ModOrAbility, Modifier> = {
  // region Stasis
  [ModOrAbility.WhisperOfDurance]: {
    id: ModOrAbility.WhisperOfDurance,
    name: "Whisper of Durance",
    description:
      "Slow that you apply to targets lasts longer. For those abilities that linger, their duration will also increase.",
    type: ModifierType.Stasis,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3469412969,
  },
  [ModOrAbility.WhisperOfChains]: {
    id: ModOrAbility.WhisperOfChains,
    name: "Whisper of Chains",
    description:
      "While you are near frozen targets or a friendly Stasis crystal, you take reduced damage from targets.",
    type: ModifierType.Stasis,
    bonus: [{ stat: ArmorStat.Recovery, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 537774540,
  },
  [ModOrAbility.WhisperOfConduction]: {
    id: ModOrAbility.WhisperOfConduction,
    name: "Whisper of Conduction",
    description: "Nearby Stasis shards track to your position.",
    type: ModifierType.Stasis,
    bonus: [
      { stat: ArmorStat.Intellect, value: 10 },
      { stat: ArmorStat.Resilience, value: 10 },
    ],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2483898429,
  },
  [ModOrAbility.WhisperOfBonds]: {
    id: ModOrAbility.WhisperOfBonds,
    name: "Whisper of Bonds",
    description: "Defeating frozen targets generates an Orb of Power.",
    type: ModifierType.Stasis,
    bonus: [{ stat: ArmorStat.Intellect, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3469412974,
  },
  [ModOrAbility.WhisperOfHunger]: {
    id: ModOrAbility.WhisperOfHunger,
    name: "Whisper of Hunger",
    description: "Increases the melee energy gained from picking up Stasis shards.",
    type: ModifierType.Stasis,
    bonus: [{ stat: ArmorStat.Strength, value: -20 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2483898431,
  },
  [ModOrAbility.WhisperOfFractures]: {
    id: ModOrAbility.WhisperOfFractures,
    name: "Whisper of Fractures",
    description: "Your melee energy recharges faster when you are near two or more targets.",
    type: ModifierType.Stasis,
    bonus: [{ stat: ArmorStat.Discipline, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 537774542,
  },
  [ModOrAbility.WhisperOfImpetus]: {
    id: ModOrAbility.WhisperOfImpetus,
    name: "Whisper of Impetus",
    description:
      "Damaging targets with a Stasis melee reloads your stowed weapons and grants you a temporary boost to weapon ready speed.",
    type: ModifierType.Stasis,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 537774543,
  },
  // endregion Stasis

  // region Void
  [ModOrAbility.EchoOfExpulsion]: {
    id: ModOrAbility.EchoOfExpulsion,
    name: "Echo of Expulsion",
    description: "Void ability final blows cause targets to explode.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Intellect, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984665,
  },
  [ModOrAbility.EchoOfProvision]: {
    id: ModOrAbility.EchoOfProvision,
    name: "Echo of Provision",
    description: "Damaging targets with grenades grants melee energy.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Strength, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984664,
  },
  [ModOrAbility.EchoOfPersistence]: {
    id: ModOrAbility.EchoOfPersistence,
    name: "Echo of Persistence",
    description:
      "Void buffs applied to you (Invisibility, Overshield, and Devour) have increased duration.",
    type: ModifierType.Void,
    bonus: [{ stat: SpecialArmorStat.ClassAbilityRegenerationStat, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984671,
  },
  [ModOrAbility.EchoOfLeeching]: {
    id: ModOrAbility.EchoOfLeeching,
    name: "Echo of Leeching",
    description: "Melee final blows start health regeneration for you and nearby allies.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984670,
  },
  [ModOrAbility.EchoOfDomineering]: {
    id: ModOrAbility.EchoOfDomineering,
    name: "Echo of Domineering",
    description:
      "After suppressing a target, you gain greatly increased mobility for a short duration, and your equipped weapon is reloaded from reserves.\n\nDefeating suppressed targets creates a Void Breach.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Discipline, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984657,
  },
  [ModOrAbility.EchoOfDilation]: {
    id: ModOrAbility.EchoOfDilation,
    name: "Echo of Dilation",
    description: "While crouched, you sneak faster and gain enhanced radar resolution.",
    type: ModifierType.Void,
    bonus: [
      { stat: ArmorStat.Mobility, value: 10 },
      { stat: ArmorStat.Intellect, value: 10 },
    ],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984656,
  },
  [ModOrAbility.EchoOfUndermining]: {
    id: ModOrAbility.EchoOfUndermining,
    name: "Echo of Undermining",
    description: "Your Void grenades weaken targets.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Discipline, value: -20 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2272984668,
  },
  [ModOrAbility.EchoOfInstability]: {
    id: ModOrAbility.EchoOfInstability,
    name: "Echo of Instability",
    description: "Defeating targets with grenades grants Volatile Rounds to your Void weapons.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2661180600,
  },
  [ModOrAbility.EchoOfHarvest]: {
    id: ModOrAbility.EchoOfHarvest,
    name: "Echo of Harvest",
    description: "Defeating weakened targets creates an Orb of Power and a Void Breach.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Intellect, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2661180601,
  },
  [ModOrAbility.EchoOfObscurity]: {
    id: ModOrAbility.EchoOfObscurity,
    name: "Echo of Obscurity",
    description: "Finisher final blows grant Invisibility.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Recovery, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2661180602,
  },
  [ModOrAbility.EchoOfStarvation]: {
    id: ModOrAbility.EchoOfStarvation,
    name: "Echo of Starvation",
    description: "Picking up a Void Breach or an Orb of Power grants Devour.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Recovery, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 2661180603,
  },
  [ModOrAbility.EchoOfVigilance]: {
    id: ModOrAbility.EchoOfVigilance,
    name: "Echo of Vigilance",
    description:
      "Defeating a target while your shields are depleted grants you a temporary Void overshield.",
    type: ModifierType.Void,
    bonus: [{ stat: ArmorStat.Recovery, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3854948621,
  },
  // endregion Void

  // region Solar
  [ModOrAbility.EmberOfBenelovence]: {
    id: ModOrAbility.EmberOfBenelovence,
    name: "Ember of Benevolence",
    description:
      "Applying restoration, cure,  or radiant to allies grants increased grenade, melee, and class ability regeneration for a short duration.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Discipline, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132292,
  },
  [ModOrAbility.EmberOfBeams]: {
    id: ModOrAbility.EmberOfBeams,
    name: "Ember of Beams",
    description: "Your Solar Super projectiles have stronger target acquisition.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Intellect, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132295,
  },
  [ModOrAbility.EmberOfEmpyrean]: {
    id: ModOrAbility.EmberOfEmpyrean,
    name: "Ember of Empyrean",
    description:
      "Solar weapon or ability final blows extend the duration of restoration and radiant effects applied to you.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Resilience, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132294,
  },
  [ModOrAbility.EmberOfCombustion]: {
    id: ModOrAbility.EmberOfCombustion,
    name: "Ember of Combustion",
    description:
      "Final blows with a Solar Super causes targets to ignite and creates a Firesprite.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132289,
  },
  [ModOrAbility.EmberOfChar]: {
    id: ModOrAbility.EmberOfChar,
    name: "Ember of Char",
    description: "Your Solar ignitions spread scorch to affected targets.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Discipline, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132291,
  },
  [ModOrAbility.EmberOfTempering]: {
    id: ModOrAbility.EmberOfTempering,
    name: "Ember of Tempering",
    description:
      "Solar weapon final blows grant you and your allies increased recovery for a short duration. Stacks 3 times.\n\nWhile Ember of Tempering is active, your weapons have increased airborne effectiveness, and your Solar weapon final blows create a Firesprite.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Recovery, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132290,
  },
  [ModOrAbility.EmberOfEruption]: {
    id: ModOrAbility.EmberOfEruption,
    name: "Ember of Eruption",
    description: "Your Solar ignitions have increased area of effect.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1051276348,
  },
  [ModOrAbility.EmberOfWonder]: {
    id: ModOrAbility.EmberOfWonder,
    name: "Ember of Wonder",
    description:
      "Rapidly defeating multiple targets with Solar ignitions generates an Orb of Power.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1051276350,
  },
  [ModOrAbility.EmberOfSearing]: {
    id: ModOrAbility.EmberOfSearing,
    name: "Ember of Searing",
    description: "Defeating scorched targets grants melee energy and creates a Firesprite.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Recovery, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1051276351,
  },
  [ModOrAbility.EmberOfTorches]: {
    id: ModOrAbility.EmberOfTorches,
    name: "Ember of Torches",
    description: "Powered melee attacks against combatants make you and nearby allies radiant.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Discipline, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 362132288,
  },
  [ModOrAbility.EmberOfMercy]: {
    id: ModOrAbility.EmberOfMercy,
    name: "Ember of Mercy",
    description:
      "When you revive an ally, you and other nearby allies gain restoration.\n\nPicking up a Firesprite grants restoration.",
    type: ModifierType.Solar,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4180586737,
  },
  // endregion Solar

  // region Arc
  [ModOrAbility.SparkOfBrilliance]: {
    id: ModOrAbility.SparkOfBrilliance,
    name: "Spark of Brilliance",
    description: "Defeating a blinded target with precision damage creates a blinding explosion.",
    type: ModifierType.Arc,
    bonus: [{ stat: ArmorStat.Intellect, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3277705905,
  },
  [ModOrAbility.SparkOfFeedback]: {
    id: ModOrAbility.SparkOfFeedback,
    name: "Spark of Feedback",
    description: "Taking melee damage briefly increases your outgoing melee damage.",
    type: ModifierType.Arc,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3277705907,
  },
  [ModOrAbility.SparkOfDischarge]: {
    id: ModOrAbility.SparkOfDischarge,
    name: "Spark of Discharge",
    description: "Arc weapon final blows have a chance to create an Ionic Trace.",
    type: ModifierType.Arc,
    bonus: [{ stat: ArmorStat.Strength, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1727069362,
  },
  [ModOrAbility.SparkOfFocus]: {
    id: ModOrAbility.SparkOfFocus,
    name: "Spark of Focus",
    description: "After sprinting for a short time, your class ability regeneration is increased.",
    type: ModifierType.Arc,
    bonus: [{ stat: SpecialArmorStat.ClassAbilityRegenerationStat, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1727069360,
  },
  [ModOrAbility.SparkOfVolts]: {
    id: ModOrAbility.SparkOfVolts,
    name: "Spark of Volts",
    description: "Finishers make you amplified.",
    type: ModifierType.Arc,
    bonus: [{ stat: ArmorStat.Recovery, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3277705904,
  },
  [ModOrAbility.SparkOfResistance]: {
    id: ModOrAbility.SparkOfResistance,
    name: "Spark of Resistance",
    description: "While surrounded by combatants, you are more resistant to incoming damage.",
    type: ModifierType.Arc,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1727069366,
  },
  [ModOrAbility.SparkOfShock]: {
    id: ModOrAbility.SparkOfShock,
    name: "Spark of Shock",
    description: "Your Arc grenades jolt targets.",
    type: ModifierType.Arc,
    bonus: [{ stat: ArmorStat.Discipline, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 1727069364,
  },
  // endregion Arc

  // region Strand
  [ModOrAbility.ThreadOfFury]: {
    id: ModOrAbility.ThreadOfFury,
    name: "Thread of Fury",
    description: "Damaging targets with a Tangle grants melee energy.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Strength, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512219,
  },
  [ModOrAbility.ThreadOfAscent]: {
    id: ModOrAbility.ThreadOfAscent,
    name: "Thread of Ascent",
    description:
      "Activating your grenade ability reloads your equipped weapon and grants bonus airborne effectiveness and handling for a short duration.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Mobility, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512216,
  },
  [ModOrAbility.ThreadOfFinality]: {
    id: ModOrAbility.ThreadOfFinality,
    name: "Thread of Finality",
    description: "Finisher final blows create Threadlings.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Recovery, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512217,
  },
  [ModOrAbility.ThreadOfWarding]: {
    id: ModOrAbility.ThreadOfWarding,
    name: "Thread of Warding",
    description: "Picking up an Orb of Power grants Woven Mail.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Resilience, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512222,
  },
  [ModOrAbility.ThreadOfTransmutation]: {
    id: ModOrAbility.ThreadOfTransmutation,
    name: "Thread of Transmutation",
    description: "While you have Woven Mail, weapon final blows create a Tangle.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512221,
  },
  [ModOrAbility.ThreadOfEvolution]: {
    id: ModOrAbility.ThreadOfEvolution,
    name: "Thread of Evolution",
    description: "Threadlings travel farther and deal additional damage.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Intellect, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512211,
  },
  [ModOrAbility.ThreadOfBinding]: {
    id: ModOrAbility.ThreadOfBinding,
    name: "Thread of Binding",
    description: "Super final blows emit a suspending burst from the target.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3192552688,
  },
  [ModOrAbility.ThreadOfGeneration]: {
    id: ModOrAbility.ThreadOfGeneration,
    name: "Thread of Generation",
    description: "Dealing damage generates grenade energy.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Discipline, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 3192552691,
  },
  [ModOrAbility.ThreadOfPropagation]: {
    id: ModOrAbility.ThreadOfPropagation,
    name: "Thread of Propagation",
    description: "Powered melee final blows grant your Strand weapons Unraveling Rounds.",
    type: ModifierType.Strand,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: 4208512210,
  },
  // endregion Strand

  // region Prismatic
  [ModOrAbility.FacetOfAwakening]: {
    id: ModOrAbility.FacetOfAwakening,
    name: "Facet of Awakening",
    description:
      "Rapid elemental final blows and Super final blows generate an elemental pickup of the matching damage type.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Resilience, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfCourage]: {
    id: ModOrAbility.FacetOfCourage,
    name: "Facet of Courage",
    description:
      "Your Light abilities deal increased damage to targets afflicted with Darkness debuffs.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Discipline, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfDawn]: {
    id: ModOrAbility.FacetOfDawn,
    name: "Facet of Dawn",
    description:
      "Powered melee hits against targets make you Radiant. Powered melee final blows make both you and nearby allies Radiant.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Strength, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfDefiance]: {
    id: ModOrAbility.FacetOfDefiance,
    name: "Facet of Defiance",
    description:
      "Finishers create a detonation that either jolts, scorches, slows, severs, or makes targets volatile based on the damage type of your equipped Super.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Recovery, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfDevotion]: {
    id: ModOrAbility.FacetOfDevotion,
    name: "Facet of Devotion",
    description:
      "Defeating targets afflicted with a Darkness debuff grants bonus Light Transcendence energy.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfDominance]: {
    id: ModOrAbility.FacetOfDominance,
    name: "Facet of Dominance",
    description: "Your Void grenades weaken targets, and your Arc grenades jolt targets.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Discipline, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfGrace]: {
    id: ModOrAbility.FacetOfGrace,
    name: "Facet of Grace",
    description:
      "Damaging targets with Kinetic weapons grants you bonus Transcendence energy. Defeating targets with your Super grants you and nearby allies bonus Transcendence energy.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Resilience, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfHonor]: {
    id: ModOrAbility.FacetOfHonor,
    name: "Facet of Honor",
    description:
      "Collecting an elemental pickup or destroying a Tangle grants Transcendence energy of the same type.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfJustice]: {
    id: ModOrAbility.FacetOfJustice,
    name: "Facet of Justice",
    description: "While Transcendent, your ability final blows explode.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Intellect, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfProtection]: {
    id: ModOrAbility.FacetOfProtection,
    name: "Facet of Protection",
    description: "While surrounded by enemies, you are more resistant to incoming damage.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Strength, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfPurpose]: {
    id: ModOrAbility.FacetOfPurpose,
    name: "Facet of Purpose",
    description:
      "Picking up an Orb of Power grants either Amplified, Restoration, Frost Armor, Woven Mail, or Overshield, based on the damage type of your equipped super.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Recovery, value: -10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfRuin]: {
    id: ModOrAbility.FacetOfRuin,
    name: "Facet of Ruin",
    description:
      "Increases the size and damage of the burst when you shatter a Stasis crystal or frozen target and increases the area of effect of Solar ignitions.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Mobility, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  [ModOrAbility.FacetOfSacrifice]: {
    id: ModOrAbility.FacetOfSacrifice,
    name: "Facet of Sacrifice",
    description:
      "While you have a Light buff, ability final blows grant bonus Darkness Transcendence energy.",
    type: ModifierType.Prismatic,
    bonus: [{ stat: ArmorStat.Discipline, value: 10 }],
    cost: 1,
    requiredArmorAffinity: DestinyEnergyType.Any,
    hash: -1, //! TODO: replace this placeholder with the actual hash
  },
  // endregion Prismatic
};
