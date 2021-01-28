(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var serverSystem = server.registerSystem(0, 0);

// Setup which events to listen for
serverSystem.initialize = function () {
  // Register any events you will send to the client
  // system.registerEventData(...)

  // Register any components you will attach to game objects
  // system.registerComponent(...)

  // Set up any events you wish to listen to
  serverSystem.listenForEvent("yubiserveraddon:pinky", eventData => receivePinkyMessage(eventData));

  serverSystem.listenForEvent("yubiserveraddon:chicken", eventData => serverSystem.spawnChicken(eventData));

  // Enable full logging, useful for seeing errors, you will probably want to disable this for
  // release versions of your scripts.
  // Generally speaking it's not recommended to use broadcastEvent in initialize, but for configuring logging it's fine.
  const scriptLoggerConfig = serverSystem.createEventData("minecraft:script_logger_config");
  scriptLoggerConfig.data.log_errors = true;
  scriptLoggerConfig.data.log_information = true;
  scriptLoggerConfig.data.log_warnings = true;
  serverSystem.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);
};

// per-tick updates
serverSystem.update = function () {
  // Any logic that needs to happen every tick on the server.
};

function receivePinkyMessage(parameters) {
  if (parameters.data.narf) {
    //set up chat event data object
    let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
    chatEventData.data.message = "The same thing we do every night Client. TRY TO TAKE OVER THE WORLD.";
    serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
  }
}

serverSystem.spawnChicken = function (parameters) {
  if (parameters.data.narf) {
    // Spawn the CHICKEN
    let startGameChicken = this.createEntity("entity", "minecraft:chicken");
    let name = this.createComponent(startGameChicken, "minecraft:nameable");
    name.data.alwaysShow = true;
    name.data.name = "LOOK, A CHICKEN";
    this.applyComponentChanges(startGameChicken, name);
  }
};

},{}]},{},[1]);
