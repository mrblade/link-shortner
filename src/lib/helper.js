// place files you want to import through the `$lib` alias in this folder.

import Chance from "chance";
import { createAvatar } from '@dicebear/core';
import  { botttsNeutral } from '@dicebear/collection';



/**
 * @param {string | URL} url
 */
export function isValidUrl(url) {
    let valid = true;
    try {
        new URL(url);
    } catch (error) {
        valid = false;
    }
    return valid;
}

/**
 * @param {string} seedValue
 */
export function userName(seedValue){

    if(!seedValue){
        return null;
    }

    const animals = [
        "Lion", "Tiger", "Bear", "Wolf", "Fox", "Eagle", "Hawk", "Shark",
        "Panther", "Leopard", "Cheetah", "Falcon", "Python", "Cobra", "Jaguar",
        "Cougar", "Ocelot", "Lynx", "Puma", "Viper"
    ];
    const adjectives = [
        "Agile", "Brave", "Cunning", "Daring", "Eager", "Fierce", "Gentle",
        "Happy", "Jolly", "Keen", "Lazy", "Mighty", "Nimble", "Proud", "Quick", "Strong", "Valiant", "Wise", "Zealous"
    ];

    const chance = new Chance(seedValue);
     // Define patterns for usernames
     const adj = chance.pickone(adjectives).toLocaleLowerCase();
     const noun = chance.pickone(animals).toLocaleLowerCase();
     const number = chance.integer({ min: 1000, max: 9999 });
     return `${adj}${noun}${number}`;
    
}

/**
 * @param {string} seedValue
 */
export function userAvatar(seedValue){
    const avatar =  createAvatar(botttsNeutral, {
        seed: seedValue
      });
      
    return avatar.toString();

}