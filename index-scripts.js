var winLoc = window.location.href;
var campaignTitle;
var idCheck = window.location.hash;
var scionUser = idCheck.replace("#", "");
scionUser = scionUser.charAt(0).toUpperCase() + scionUser.slice(1);

// this sets the window title
document.title = campaignTitle;

// global variables used for index.html
var characterName = scionUser;
var characterPantheon;
var characterList = "";

// location references
var firebaseName = "https://vivid-torch-2840.firebaseio.com/web/data/" + campaignTitle;
var ref = new Firebase(firebaseName);
var usersRef = ref.child(characterName + "/");

baseAttacks = {'Unarmed Clinch': {'attackAttribute': 'strength', 'attackBase': '0', 'attackSkill': 'brawl', 'damageAttribute': 'strength', 'damageBase': '1', 'damageType': 'bashing', 'parryBase': '0'}, 'Unarmed Heavy': {'attackAttribute': 'dexterity', 'attackBase': '-1', 'attackSkill': 'brawl', 'damageAttribute': 'strength', 'damageBase': '3', 'damageType': 'bashing', 'parryBase': '-1'}, 'Unarmed Light': {'attackAttribute': 'dexterity', 'attackBase': '1', 'attackSkill': 'brawl', 'damageAttribute': 'strength', 'damageBase': '1', 'damageType': 'bashing', 'parryBase': '1'}};

// these functions need to happen when any of the pages load
function onLoadFunctions() {
	ref.once("value", getPeopleList);
	getCharacterList();
}

function getPeopleList(snapshot) {
	peopleList = snapshot.val();
	changeBaseSheet();
}

// gets the list of characters from Firebase and calls writeCharacterList
function getCharacterList() {
		ref.orderByKey().on("value", writeCharacterList);
}
// prints the links for the different character pages on index.html
function writeCharacterList(snapshot) {
	var characters = snapshot.val();
	characterList = "";
	visibleCharacterList = "";
	hiddenCharacterList = "";
	for(var characterName in characters) {
		if(characters[characterName]['visible'] == true && characters[characterName]['friendly'] == "1") {
			characterList = characterList + "<a href=\"character.html#" + characterName + "\">" + characterName + "</a><br>";
		}
		if(document.getElementById('visibleCharacterListing') && characters[characterName]['visible'] == true && characters[characterName]['friendly'] != "1") {
			visibleCharacterList = visibleCharacterList + "<a href=\"character.html#" + characterName + "\">" + characterName + "</a><br>";
		}
		if(document.getElementById('hiddenCharacterListing') && characters[characterName]['visible'] == false) {
			hiddenCharacterList = hiddenCharacterList + "<a href=\"character.html#" + characterName + "\">" + characterName + "</a><br>";
		}
	}
	document.getElementById("characterListing").innerHTML = characterList;
	if(document.getElementById('visibleCharacterListing')) {
		document.getElementById("visibleCharacterListing").innerHTML = visibleCharacterList;
	}
	if(document.getElementById('hiddenCharacterListing')) {
		document.getElementById('hiddenCharacterListing').innerHTML = hiddenCharacterList;
	}
	groupList = "";
	group1 = "<br>Group 1: ";
	group2 = "<br>Group 2: ";
	group3 = "<br>Group 3: ";
	group4 = "<br>Group 4: ";
	group5 = "<br>Group 5: ";
	group6 = "<br>Group 6: ";
	group7 = "<br>Group 7: ";
	group8 = "<br>Group 8: ";
	group9 = "<br>Group 9: ";
	for(var characterName in characters) {
		if(characters[characterName]['friendly'] == "1") {
			group1 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "2") {
			group2 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "3") {
			group3 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "4") {
			group4 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "5") {
			group5 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "6") {
			group6 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "7") {
			group7 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "8") {
			group8 += characterName + ", ";
		}
		if(characters[characterName]['friendly'] == "9") {
			group9 += characterName + ", ";
		}
	}
	groupList = group1 + group2 + group3 + group4 + group5 + group6 + group7 + group8 + group9;
	if(document.getElementById('currentGroups')) {
		document.getElementById('currentGroups').innerHTML = groupList;
	}
}


function changeBaseSheet() {
	// for(var character in peopleList) {
	// 	tempModRef = ref.child(character + "/boons/");
	// 	tempModRef.child("illusion").update({"shenanigans": "false"});
	// }
	//
	// for(var character in peopleList) {
	// 	tempModRef = ref.child(character + "/boons/illusion/");
	// 	tempModRef.child("hiddenName").remove();
	// }
}

// this removes any of the temp modifiers with a scene duration
function resetScene() {
	for(var character in peopleList) {
		for(var tempMod in peopleList[character]['tempModifier']) {
			if(peopleList[character]['tempModifier'][tempMod]['tempModifierDuration'] == "scene") {
				tempModRef = ref.child(character + "/tempModifier/");
				tempModRef.child(tempMod).remove();
			}
		}
	}
}
// this removes any of the temp modifiers with a story duration
function resetStory() {
	for(var character in peopleList) {
		for(var tempMod in peopleList[character]['tempModifier']) {
			if(peopleList[character]['tempModifier'][tempMod]['tempModifierDuration'] == "story") {
				tempModRef = ref.child(character + "/tempModifier/");
				tempModRef.child(tempMod).remove();
			}
		}
	}
}


// this creates blank values and sets the tables in the new character's node
function setFieldTemplate() {
	if(document.getElementById('visibleCharacterListing')) {
		usersRef.update({visible: false});
		usersRef.update({friendly: "0"});
	} else {
		usersRef.update({visible: true});
		usersRef.update({friendly: "1"});
	}
	refOfTraitRefs1 = [coreTraitsRef, attributesRef, epicAttributesRef, virtuesRef, skillsRef];
	tempOfTemplates1 = [coreTraitsFieldTemplate, attributeFieldTemplate, epicAttributeFieldTemplate, virtuesFieldTemplate, skillsFieldTemplate];
	for(i = 0; i < tempOfTemplates1.length; i++) {
		masterRef1 = refOfTraitRefs1[i];
		masterTemp1 = tempOfTemplates1[i];
		var updatedObj1 = {};
		for(j = 0; j < masterTemp1.length; j++) {
			var id = masterTemp1[j];
			updatedObj1[id] = 0;
		}
		masterRef1.update(updatedObj1);
	}
	refOfTraitRefs2 = [knacksRef.child("epicStrength"), knacksRef.child("epicDexterity"), knacksRef.child("epicStamina"), knacksRef.child("epicCharisma"), knacksRef.child("epicManipulation"), knacksRef.child("epicAppearance"), knacksRef.child("epicPerception"), knacksRef.child("epicIntelligence"), knacksRef.child("epicWits"), boonsRef.child("animal"), boonsRef.child("chaos"), boonsRef.child("creation"), boonsRef.child("darkness"), boonsRef.child("death"), boonsRef.child("earth"), boonsRef.child("fertility"), boonsRef.child("fire"), boonsRef.child("frost"), boonsRef.child("guardian"), boonsRef.child("health"), boonsRef.child("illusion"), boonsRef.child("justice"), boonsRef.child("magic"), boonsRef.child("moon"), boonsRef.child("mystery"), boonsRef.child("prophecy"), boonsRef.child("psychopomp"), boonsRef.child("sky"), boonsRef.child("star"), boonsRef.child("sun"), boonsRef.child("thunder"), boonsRef.child("war"), boonsRef.child("water"), boonsRef.child("psp")];
	tempOfTemplates2 = [epicStrengthKnacksFieldTemplate, epicDexterityKnacksFieldTemplate, epicStaminaKnacksFieldTemplate, epicCharismaKnacksFieldTemplate, epicManipulationKnacksFieldTemplate, epicAppearanceKnacksFieldTemplate, epicPerceptionKnacksFieldTemplate, epicIntelligenceKnacksFieldTemplate, epicWitsKnacksFieldTemplate, animalBoonsFieldTemplate, chaosBoonsFieldTemplate, creationBoonsFieldTemplate, darknessBoonsFieldTemplate, deathBoonsFieldTemplate, earthBoonsFieldTemplate, fertilityBoonsFieldTemplate, fireBoonsFieldTemplate, frostBoonsFieldTemplate, guardianBoonsFieldTemplate, healthBoonsFieldTemplate, illusionBoonsFieldTemplate, justiceBoonsFieldTemplate, magicBoonsFieldTemplate, moonBoonsFieldTemplate, mysteryBoonsFieldTemplate, prophecyBoonsFieldTemplate, psychopompBoonsFieldTemplate, skyBoonsFieldTemplate, starBoonsFieldTemplate, sunBoonsFieldTemplate, thunderBoonsFieldTemplate, warBoonsFieldTemplate, waterBoonsFieldTemplate, pspBoonsFieldTemplate];
	for(i = 0; i < tempOfTemplates2.length; i++) {
		masterRef2 = refOfTraitRefs2[i];
		masterTemp2 = tempOfTemplates2[i];
		var updatedObj2 = {};
		for(j = 0; j < masterTemp2.length; j++) {
			var id = masterTemp2[j];
			updatedObj2[id] = false;
		}
		masterRef2.update(updatedObj2);
	}
	window.setTimeout(function(){location.reload()},6000);
}

// triggered by Create New Character button on index.html
function createNewCharacter() {
	if(document.getElementById("characterNameEntry").value != ""){
		characterName = document.getElementById('characterNameEntry').value;
		characterPantheon = document.getElementById('pantheonEntry').value;
		usersRef = ref.child(characterName);
		coreTraitsRef = ref.child(characterName + "/coreTraits/");
		attributesRef = ref.child(characterName + "/attributes/");
		epicAttributesRef = ref.child(characterName + "/epicAttributes/");
		virtuesRef = ref.child(characterName + "/virtues/");
		skillsRef = ref.child(characterName + "/skills/");
		knacksRef = ref.child(characterName + "/knacks/");
		boonsRef = ref.child(characterName + "/boons/");
		attacksRef = ref.child(characterName + "/attacks/")
		usersRef.update({selfName: characterName});
		usersRef.update({characterPantheon: characterPantheon}, setFieldTemplate);
		attacksRef.update(baseAttacks);
	}
}
