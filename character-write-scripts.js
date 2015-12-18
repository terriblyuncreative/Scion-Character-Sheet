// this adds a new Fatebond to the character
function addNewFatebond() {
	var newFatebond = {};
	if(document.getElementById('fatebondLevelEntry').value != "" && document.getElementById('fatebondSourceEntry').value != "" && document.getElementById('fatebondBonusEntry').value != "Choose One" && document.getElementById('fatebondPenaltyEntry').value != "Choose One") {
		newFatebond['fatebondLevel'] = document.getElementById('fatebondLevelEntry').value;
		newFatebond['fatebondSource'] = document.getElementById('fatebondSourceEntry').value;
		newFatebond['fatebondBonus'] = document.getElementById('fatebondBonusEntry').value;
		newFatebond['fatebondPenalty'] = document.getElementById('fatebondPenaltyEntry').value;
		fatebondsRef.push(newFatebond);
		location.reload();
	}
}
// this adds a new Temporary Modifier to the character
function addNewTempModifier(tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration) {
	var newTempModifier = {};
	if(tempModifierLevel != "" && tempModifierSource != "" && tempModifier != "Choose One") {
		newTempModifier['tempModifierLevel'] = convertToEffectiveNumberBoons(tempModifierLevel);
		newTempModifier['tempModifierType'] = tempModifierType;
		newTempModifier['tempModifierSource'] = tempModifierSource;
		newTempModifier['tempModifier'] = tempModifier;
		newTempModifier['tempModifierDuration'] = tempModifierDuration;
		tempModifierRef.push(newTempModifier);
	}

}




// this adds a new Relic to the character
function addNewRelic() {
	var newRelic = {};
	if(document.getElementById('relicNameEntry').value != "" && document.getElementById('relicLevelEntry').value != "") {
		newRelic['relicLevel'] = document.getElementById('relicLevelEntry').value;
		newRelic['enabled'] = true;
		if(document.getElementById('inherentRelicEntry').checked == true) {
			newRelic['inherent'] = true;
		} else {
			newRelic['inherent'] = false;
		}
		if(document.getElementById('remoteAccessRelicEntry').checked == true) {
			newRelic['remoteAccess'] = true;
		} else {
			newRelic['remoteAccess'] = false;
		}
		relicName = document.getElementById('relicNameEntry').value;
		relicsRef.child(relicName).update(newRelic);
		location.reload();
	}
}
// this adds a new attack to the character
function addNewAttack() {
	var newAttack = {};
	if(document.getElementById('attackNameEntry').value != "") {
		attackName = document.getElementById('attackNameEntry').value;
		newAttack['attackAttribute'] = document.getElementById('attackAttributeSelector').value;
		newAttack['attackSkill'] = document.getElementById('attackSkillSelector').value;
		newAttack['attackBase'] = document.getElementById('attackBaseSelector').value;
		newAttack['damageAttribute'] = document.getElementById('damageAttributeSelector').value;
		newAttack['damageBase'] = document.getElementById('damageBaseSelector').value;
		newAttack['damageType'] = document.getElementById('damageTypeSelector').value;
		newAttack['parryBase'] = document.getElementById('parryBaseSelector').value;
		attacksRef.child(attackName).update(newAttack);
		location.reload();
	}
}
// this adds a new armor
function addNewArmor(armorName, bSoak, lSoak, aSoak, lethalAddAg, mobilityPenalty) {
	var newArmor = {};
	if(document.getElementById('armorNameEntry').value != "") {
		newArmor['bSoak'] = bSoak;
		newArmor['lSoak'] = lSoak;
		newArmor['aSoak'] = aSoak;
		if(lethalAddAg == true) {
			newArmor['lethalAddAg'] = true;
		} else {
			newArmor['lethalAddAg'] = false;
		}
		newArmor['mobilityPenalty'] = mobilityPenalty;
		newArmor['enabled'] = true;
		armorsRef.child(armorName).update(newArmor);
		location.reload();
	}
}
// this adds a channel to a Relic
function addRelicChannel() {
	var relicToAddTo = document.getElementById('relicPropertyEntry').value;
	var channelToAdd = document.getElementById('relicChannelSelector').value;
	channelToAdd = channelToAdd.replace("Channel", "");
	var newChannel = {};
	newChannel[channelToAdd] = true;
	newChannelRef = relicsRef.child(relicToAddTo);
	newChannelRef.child("channels").update(newChannel);
	location.reload();
}
// this adds a die buff to a Relic
function addRelicBonus() {
	var relicToAddTo = document.getElementById('relicPropertyEntry').value;
	var bonusSelector1 = document.getElementById('relicBonusSelector1').value;
	var bonusSelector2 = document.getElementById('relicBonusSelector2').value;
	var bonusSelector3 = document.getElementById('relicBonusSelector3').value;
	bonusSelector1 = bonusSelector1.replace("Bonus1", "");
	bonusSelector1 = "#" + bonusSelector1;
	bonusSelector3 = bonusSelector3.replace("Bonus", "");
	var newBonus = {};
	newBonus[bonusSelector3] = bonusSelector1;
	newBonusRef = relicsRef.child(relicToAddTo);
	newBonusRef.child(bonusSelector2).update(newBonus);
	location.reload();
}
// this adds an Item Enhancement to a Relic
function addItemEnhancement() {
	var relicToAddTo = document.getElementById('relicPropertyEntry').value;
	var bonusSelector1 = document.getElementById('itemEnhancementSelector1').value;
	var bonusSelector2 = document.getElementById('itemEnhancementSelector2').value;
	bonusSelector2 = bonusSelector2.replace("bonus", "");
	bonusSelector2 = relicToAddTo + bonusSelector2;
	var newItemEnhancement = {};
	newItemEnhancement[bonusSelector2] = bonusSelector1;
	newBonusRef = relicsRef.child(relicToAddTo);
	newBonusRef.child('itemEnhancements').update(newItemEnhancement);
	location.reload();
}
// this adds a bonus to someone's #Boons
function addRelicBoons() {
	var relicToAddTo = document.getElementById('relicPropertyEntry').value;
	var bonusSelector1 = document.getElementById('relicBonusSelectorA').value;
	var bonusSelector3 = document.getElementById('relicBonusSelectorB').value;
	bonusSelector1 = bonusSelector1.replace("BonusA", "");
	bonusSelector1 = capitalizeFirstLetter(bonusSelector1);
	bonusSelector1 = "number" + bonusSelector1;
	bonusSelector3 = bonusSelector3.replace("Bonus", "");
	var newBonus = {};
	newBonus[bonusSelector3] = bonusSelector1;
	newBonusRef = relicsRef.child(relicToAddTo);
	newBonusRef.child('relicBoons').update(newBonus);
	location.reload();
}
// this adds a miscellaneous text-only property to a Relic
function addRelicProperty() {
	var relicToAddTo = document.getElementById('relicPropertyEntry').value;
	var miscPropEntry = document.getElementById('relicMiscPropEntry').value;
	var newProp = {};
	var propId = makeid();
	newProp[propId] = miscPropEntry;
	newPropRef = relicsRef.child(relicToAddTo);
	newPropRef.child('miscProperties').update(newProp);
	location.reload();
}




// this sets the Firebase values from the fields on the Update Character tab, then reloads the page
function setDatabaseFromFields() {
	refOfTraitRefs1 = [coreTraitsRef, attributesRef, epicAttributesRef, virtuesRef, skillsRef];
	tempOfTemplates1 = [coreTraitsFieldTemplate, attributeFieldTemplate, epicAttributeFieldTemplate, virtuesFieldTemplate, skillsFieldTemplate];
	for(i = 0; i < refOfTraitRefs1.length; i++) {
		masterRef1 = refOfTraitRefs1[i];
		masterTemp1 = tempOfTemplates1[i];
		var updatedObj1 = {};
		for (j = 0; j < masterTemp1.length; j++) {
			entryBuilder1 = masterTemp1[j] + "Entry";
			valueBuilder1 = masterTemp1[j] + "Value";
			keyBuilder1 = masterTemp1[j];
			if(document.getElementById(entryBuilder1).value != "") {
				valueBuilder1 = parseInt(document.getElementById(entryBuilder1).value);
				updatedObj1[keyBuilder1] = valueBuilder1;
			}
		}
		masterRef1.update(updatedObj1);
	}
	refOfTraitRefs2 = [knacksRef.child("epicStrength"), knacksRef.child("epicDexterity"), knacksRef.child("epicStamina"), knacksRef.child("epicCharisma"), knacksRef.child("epicManipulation"), knacksRef.child("epicAppearance"), knacksRef.child("epicPerception"), knacksRef.child("epicIntelligence"), knacksRef.child("epicWits"), boonsRef.child("animal"), boonsRef.child("chaos"), boonsRef.child("creation"), boonsRef.child("darkness"), boonsRef.child("death"), boonsRef.child("earth"), boonsRef.child("fertility"), boonsRef.child("fire"), boonsRef.child("frost"), boonsRef.child("guardian"), boonsRef.child("health"), boonsRef.child("illusion"), boonsRef.child("justice"), boonsRef.child("magic"), boonsRef.child("moon"), boonsRef.child("mystery"), boonsRef.child("prophecy"), boonsRef.child("psychopomp"), boonsRef.child("sky"), boonsRef.child("star"), boonsRef.child("sun"), boonsRef.child("thunder"), boonsRef.child("war"), boonsRef.child("water"), boonsRef.child("psp")];
	tempOfTemplates2 = [epicStrengthKnacksFieldTemplate, epicDexterityKnacksFieldTemplate, epicStaminaKnacksFieldTemplate, epicCharismaKnacksFieldTemplate, epicManipulationKnacksFieldTemplate, epicAppearanceKnacksFieldTemplate, epicPerceptionKnacksFieldTemplate, epicIntelligenceKnacksFieldTemplate, epicWitsKnacksFieldTemplate, animalBoonsFieldTemplate, chaosBoonsFieldTemplate, creationBoonsFieldTemplate, darknessBoonsFieldTemplate, deathBoonsFieldTemplate, earthBoonsFieldTemplate, fertilityBoonsFieldTemplate, fireBoonsFieldTemplate, frostBoonsFieldTemplate, guardianBoonsFieldTemplate, healthBoonsFieldTemplate, illusionBoonsFieldTemplate, justiceBoonsFieldTemplate, magicBoonsFieldTemplate, moonBoonsFieldTemplate, mysteryBoonsFieldTemplate, prophecyBoonsFieldTemplate, psychopompBoonsFieldTemplate, skyBoonsFieldTemplate, starBoonsFieldTemplate, sunBoonsFieldTemplate, thunderBoonsFieldTemplate, warBoonsFieldTemplate, waterBoonsFieldTemplate, pspBoonsFieldTemplate];
	for(i = 0; i < refOfTraitRefs2.length; i++) {
		masterRef2 = refOfTraitRefs2[i];
		masterTemp2 = tempOfTemplates2[i];
		var updatedObj2 = {};
		for (j = 0; j < masterTemp2.length; j++) {
			entryBuilder2 = masterTemp2[j] + "Entry";
			valueBuilder2 = masterTemp2[j] + "Value";
			keyBuilder2 = masterTemp2[j];
			if(document.getElementById(entryBuilder2).checked == true) {
				updatedObj2[keyBuilder2] = true;
			}
			if(document.getElementById(entryBuilder2).checked == false) {
				updatedObj2[keyBuilder2] = false;
			}
		}
		masterRef2.update(updatedObj2);
	}
	window.setTimeout(function(){location.reload()},6000);
}




// this removes a Fatebond from the character's record
function removeFatebond(fbIdentifier) {
	var fatebondToRemove = fbIdentifier.getAttribute("data-id");
	fatebondsRef.child(fatebondToRemove).remove();
	location.reload();
}
// this removes a Fatebond from the character's record
function removeTempModifier(tmIdentifier) {
	var tempModifierToRemove = tmIdentifier.getAttribute("data-id");
	tempModifierRef.child(tempModifierToRemove).remove();
	location.reload();
}




// this enables a Relic
function enableRelic(relicIdentifier) {
	var relicToToggle = relicIdentifier.getAttribute("data-id");
	var newProp = {};
	newProp['enabled'] = true;
	newPropRef = relicsRef.child(relicToToggle);
	newPropRef.update(newProp);
	location.reload();
}
// this enables a Relic
function disableRelic(relicIdentifier) {
	var relicToToggle = relicIdentifier.getAttribute("data-id");
	var newProp = {};
	newProp['enabled'] = false;
	newPropRef = relicsRef.child(relicToToggle);
	newPropRef.update(newProp);
	location.reload();
}

// toggle Friendly
function toggleFriendly() {
	friendGroup = document.getElementById('friendlyGroupSelector').value;
	usersRef.update({'friendly': friendGroup});
	// if(myCharacter['friendly'] == true) {
	// 	usersRef.update({'friendly': false});
	// } else {
	// 	usersRef.update({'friendly': true});
	// }
	window.setTimeout(function(){location.reload()},500);
}
// toggle Visibility
function toggleVisible() {
	if(myCharacter['visible'] == true) {
		usersRef.update({'visible': false});
	} else {
		usersRef.update({'visible': true});
	}
	window.setTimeout(function(){location.reload()},500);
}
