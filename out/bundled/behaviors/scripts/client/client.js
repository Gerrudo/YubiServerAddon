(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var clientSystem = client.registerSystem(0, 0);

// Setup which events to listen for
clientSystem.initialize = function () {
  // Register any events you will send to the client
  const eventDataDefaults = { narf: false };
  clientSystem.registerEventData("yubiserveraddon:pinky", eventDataDefaults);
  clientSystem.registerEventData("yubiserveraddon:chicken", eventDataDefaults);

  // Register any components you will attach to game objects
  // system.registerComponent(...)

  // Set up any events you wish to listen to
  // system.listenForEvent(...);
  clientSystem.listenForEvent("minecraft:client_entered_world", eventData => clientSystem.clientJoined(eventData));

  // Enable full logging, useful for seeing errors, you will probably want to disable this for
  // release versions of your scripts.
  // Generally speaking it's not recommended to use broadcastEvent in initialize, but for configuring logging it's fine.
  const scriptLoggerConfig = clientSystem.createEventData("minecraft:script_logger_config");
  scriptLoggerConfig.data.log_errors = true;
  scriptLoggerConfig.data.log_information = true;
  scriptLoggerConfig.data.log_warnings = true;
  clientSystem.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);
};

let firstTick = true;
// per-tick updates
clientSystem.update = function () {
  // Any logic that needs to happen every tick on the client.
  if (firstTick) {
    firstTick = false;

    //Welcome Message
    let newPlayerEventData = clientSystem.createEventData("minecraft:display_chat_event");
    newPlayerEventData.data.message = "Hello player";
    clientSystem.broadcastEvent("minecraft:display_chat_event", newPlayerEventData);

    //Chicken
    let chickenEventData = clientSystem.createEventData("yubiserveraddon:chicken");
    chickenEventData.data.narf = true;
    clientSystem.broadcastEvent("yubiserveraddon:chicken", chickenEventData);

    //set up chat event data object
    let chatEventData = clientSystem.createEventData("minecraft:display_chat_event");
    chatEventData.data.message = "What are we going to do tonight Server?";
    clientSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
    // You must create the event data this way and then set your properties before you broadcast
    let pinkyEventData = clientSystem.createEventData("yubiserveraddon:pinky");
    pinkyEventData.data.narf = true;
    clientSystem.broadcastEvent("yubiserveraddon:pinky", pinkyEventData);
  }
};

clientSystem.clientJoined = function () {
  let chatEventData = clientSystem.createEventData("minecraft:display_chat_event");
  chatEventData.data.message = "PLAYER HAS JOINED, PREPARE FOR CHICKEN";
  clientSystem.broadcastEvent("minecraft:chat_event_data", chatEventData);
};

},{}]},{},[1]);
