<h1 align="center">FiveM: Survive The Hunt</h1>

<p align="center">
  <i>Game mode for FiveM, based on <a href="https://youtube.com/failrace">FailRace</a>'s YouTube series</i>
  <br>
  <br>
  <a href="https://github.com/jimmed/fivem-sth/commits/master">
    <img src="https://img.shields.io/github/last-commit/jimmed/fivem-sth.svg?style=flat" alt="Last commit">
  </a>
  <a href="">
    <img src="https://img.shields.io/github/workflow/status/jimmed/fivem-sth/CI" alt="CI Build">
  </a>
</p>

## Game Mode Rules

At the start of the round, one player is chosen as the **survivor**. All other players are **hunters**.

- Players may not leave the chosen game area (typically the city of Los Santos).
- There are no markers/indicators to show the location of other players.
- It is not possible to shoot from a vehicle; you must be on foot in order to shoot.
- All players must choose their starting vehicle and weapons before the round begins.
- Once the round starts, it is not possible to spawn in vehicles, weapons.
- Vehicles can be repaired at mod shops.
- Ammunition can be purchased from gun shops.

### The Survivor

The role of the survivor is to get through the round without dying. If the survivor does not die before the round is over, they are considered the winner of the round.

During the round, there are various optional objectives that the survivor can complete, in order to score points. On completing an objective, the hunters will be notified, with a map marker of the objective displayed to them for a short time period afterwards. These objectives come in the form of brightly coloured cars that must be destroyed. When using sticky bombs, detonation is only permitted within visual range of the bomb.

The survivor has access to a wide range of weapons and starting road vehicles.

#### Recommended play style

A good survivor will attempt to blend into NPC traffic, and use stealth and caution in order to complete as many objectives as possible. When starting, get a good distance away from the hunters, and then steal a car to try to blend in. Avoid driving too fast, running red lights or making illegal turns, as these will make it easier for hunters to detect you.

If a hunter discovers you, then use your driving skills to evade them before they can get out of their car and shoot. If they give chase, use traffic and tight turns to try to throw them off. To evade flying hunters, use tunnels and underpasses to make your route harder to predict.

### The Hunters

The role of the hunter is to coordinate with other hunters in order to find and kill the survivor. If they are killed, they may continue to spectate, but may not communicate any information about their death or the survivor to the other hunters.

Hunters have access to a limited selection of weapons (no explosives permitted) and a range of starting vehicles. Flying vehicles are permitted, except those that have weapons.

#### Recommended play style

Communication is absolutely key for hunters. Work as a team to cover as many areas as possible, and keep each other updated on possible sightings. If one of your team finds the survivor, work together to try to stop and box them in so they can't drive off ─ heavy vehicles like cement mixers are very effective for this!

It's useful to have one or two hunters in airborne vehicles to make patrolling large areas easier, as well as being harder to shake off when chasing the survivor.
However, it's advisable to have the majority of hunters in road vehicles, as you will have to exit your vehicle in order to use any weapons.

The starting vehicles available to hunters are rather limited in terms of performance, so try to choose something that you plays to your own strengths.

### Game Options

- **Round length**
  The length of a round in game time. The default is 24 hours of game time (approx. 48 minutes)
- **Number of survivors**
  By default there is only one survivor, but it is possible to allow multiple.
- **All survivors must survive**
  If there is more that one survivor, enabling this option requires all of them to survive the round in order for them to win. Otherwise, the survivors win if at least one of them survives. Disabled by default.
- **Number of objectives**
  By default, there are 12 objectives for the survivor.
- **Survivor head start**
  The amount of time the survivor is given to flee before the hunters may start. By default, this is 30 minutes of game time (approximately 1 minute of real time).
- **Spawn point**
  The place where everyone starts. By default, this is the car park in the [Terminal](https://gta.fandom.com/wiki/Terminal) docks.

## Development

### Usage

1. Clone repository into your `resources/[local]` folder.
2. Run `yarn` to install the dependencies.
3. Start development.

#### Development

Use `yarn watch` to watch files during development.

#### Production

Build your production ready code with `yarn build`.

This will build the client and server script with the `--mode production` flag.

#### Automatic Builds (Optional)

The `fxmanifest.lua` is not setup to automatically build upon first FXServer start. If you'd like to setup automatic builds you must add the following to your `fxmanifest.lua`.

```lua
dependency 'yarn'
dependency 'webpack'

webpack_config 'webpack.config.js'
```

However, due to the speed performance of the pre-packaged webpack/yarn of cfx-server-data, we suggest you don't do this and build manually as described previously ("Production").
