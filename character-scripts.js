var winLoc = window.location.href;
var campaignTitle;
var idCheck = window.location.hash;
var scionUser = idCheck.replace("#", "");
scionUser = scionUser.charAt(0).toUpperCase() + scionUser.slice(1);
var characterName = scionUser;

// this sets the window title
scionUserTitle = scionUser + " Working Sheet";
document.title = scionUserTitle;

// location references
var firebaseName = "https://vivid-torch-2840.firebaseio.com/web/data/" + campaignTitle;
var ref = new Firebase(firebaseName);
var firebasePowers = "https://vivid-torch-2840.firebaseio.com/web/data/allPowers/";
var firebasePsp = "https://vivid-torch-2840.firebaseio.com/web/data/pspPowers/";
var firebaseGenExceptions = "https://vivid-torch-2840.firebaseio.com/web/data/genExceptions/";
var allPowersRef = new Firebase(firebasePowers);
var pspPowersRef = new Firebase(firebasePsp);
var genExceptionsRef = new Firebase(firebaseGenExceptions);
var usersRef = ref.child(characterName + "/");

var coreTraitsRef = ref.child(characterName + "/coreTraits/");
var attributesRef = ref.child(characterName + "/attributes/");
var epicAttributesRef = ref.child(characterName + "/epicAttributes/");
var virtuesRef = ref.child(characterName + "/virtues/");
var skillsRef = ref.child(characterName + "/skills/");
var knacksRef = ref.child(characterName + "/knacks/");
var boonsRef = ref.child(characterName + "/boons/");
var fatebondsRef = ref.child(characterName + "/fatebonds/");
var relicsRef = ref.child(characterName + "/relics/");
var tempModifierRef = ref.child(characterName + "/tempModifier/");
var tempRef;
var attacksRef = ref.child(characterName + "/attacks/");
var armorsRef = ref.child(characterName + "/armors/");

// global variables
var myCharacter = {};
var characterList = {};

var powerMasterList = {};
var pspMasterList = {};
var myValidChannelsList = {"psp": true};

var myRelicBonusB = [];
var myRelicBonusB2 = [];
var myRelicBonusBoons = {};
var myRelicBonusD = [];
var myRelicBonusD2 = [];
var myRelicBonusDice = {};

var myFatebonds = {};
var myTempDice = {};
var myTempSucc = {};
var myTempBoons = {};

var myAttackAttacks = {};
var myAttackDamages = {};

var epicStrengthKnacks = [];
var epicDexterityKnacks = [];
var epicStaminaKnacks = [];
var epicCharismaKnacks = [];
var epicManipulationKnacks = [];
var epicAppearanceKnacks = [];
var epicPerceptionKnacks = [];
var epicIntelligenceKnacks = [];
var epicWitsKnacks = [];

var animalBoons = [];
var chaosBoons = [];
var creationBoons = [];
var darknessBoons = [];
var deathBoons = [];
var earthBoons = [];
var fertilityBoons = [];
var fireBoons = [];
var frostBoons = [];
var guardianBoons = [];
var healthBoons = [];
var illusionBoons = [];
var justiceBoons = [];
var magicBoons = [];
var moonBoons = [];
var mysteryBoons = [];
var prophecyBoons = [];
var psychopompBoons = [];
var skyBoons = [];
var starBoons = [];
var sunBoons = [];
var thunderBoons = [];
var warBoons = [];
var waterBoons = [];
var pspBoons = [];

var tempOfKnacks = ["epicStrengthKnacks", "epicDexterityKnacks", "epicStaminaKnacks", "epicCharismaKnacks", "epicManipulationKnacks", "epicAppearanceKnacks", "epicPerceptionKnacks", "epicIntelligenceKnacks", "epicWitsKnacks"];
var tempOfKnacksTemplates = [epicStrengthKnacksFieldTemplate, epicDexterityKnacksFieldTemplate, epicStaminaKnacksFieldTemplate, epicCharismaKnacksFieldTemplate, epicManipulationKnacksFieldTemplate, epicAppearanceKnacksFieldTemplate, epicPerceptionKnacksFieldTemplate, epicIntelligenceKnacksFieldTemplate, epicWitsKnacksFieldTemplate];
var tempOfKnacksPrint = [epicStrengthKnacksForPrint, epicDexterityKnacksForPrint, epicStaminaKnacksForPrint, epicCharismaKnacksForPrint, epicManipulationKnacksForPrint, epicAppearanceKnacksForPrint, epicPerceptionKnacksForPrint, epicIntelligenceKnacksForPrint, epicWitsKnacksForPrint];
var tempOfBoons = ["animalBoons", "chaosBoons", "creationBoons", "darknessBoons", "deathBoons", "earthBoons", "fertilityBoons", "fireBoons", "frostBoons", "guardianBoons", "healthBoons", "illusionBoons", "justiceBoons", "magicBoons", "moonBoons", "mysteryBoons", "prophecyBoons", "psychopompBoons", "skyBoons", "starBoons", "sunBoons", "thunderBoons", "warBoons", "waterBoons", "pspBoons"];
var tempOfBoonsTemplates = [animalBoonsFieldTemplate, chaosBoonsFieldTemplate, creationBoonsFieldTemplate, darknessBoonsFieldTemplate, deathBoonsFieldTemplate, earthBoonsFieldTemplate, fertilityBoonsFieldTemplate, fireBoonsFieldTemplate, frostBoonsFieldTemplate, guardianBoonsFieldTemplate, healthBoonsFieldTemplate, illusionBoonsFieldTemplate, justiceBoonsFieldTemplate, magicBoonsFieldTemplate, moonBoonsFieldTemplate, mysteryBoonsFieldTemplate, prophecyBoonsFieldTemplate, psychopompBoonsFieldTemplate, skyBoonsFieldTemplate, starBoonsFieldTemplate, sunBoonsFieldTemplate, thunderBoonsFieldTemplate, warBoonsFieldTemplate, waterBoonsFieldTemplate, pspBoonsFieldTemplate];
var tempOfBoonsPrint = [animalBoonsForPrint, chaosBoonsForPrint, creationBoonsForPrint, darknessBoonsForPrint, deathBoonsForPrint, earthBoonsForPrint, fertilityBoonsForPrint, fireBoonsForPrint, frostBoonsForPrint, guardianBoonsForPrint, healthBoonsForPrint, illusionBoonsForPrint, justiceBoonsForPrint, magicBoonsForPrint, moonBoonsForPrint, mysteryBoonsForPrint, prophecyBoonsForPrint, psychopompBoonsForPrint, skyBoonsForPrint, starBoonsForPrint, sunBoonsForPrint, thunderBoonsForPrint, warBoonsForPrint, waterBoonsForPrint];

var tempOfTemplates = [epicStrengthKnacksFieldTemplate, epicDexterityKnacksFieldTemplate, epicStaminaKnacksFieldTemplate, epicCharismaKnacksFieldTemplate, epicManipulationKnacksFieldTemplate, epicAppearanceKnacksFieldTemplate, epicPerceptionKnacksFieldTemplate, epicIntelligenceKnacksFieldTemplate, epicWitsKnacksFieldTemplate, animalBoonsFieldTemplate, chaosBoonsFieldTemplate, creationBoonsFieldTemplate, darknessBoonsFieldTemplate, deathBoonsFieldTemplate, earthBoonsFieldTemplate, fertilityBoonsFieldTemplate, fireBoonsFieldTemplate, frostBoonsFieldTemplate, guardianBoonsFieldTemplate, healthBoonsFieldTemplate, illusionBoonsFieldTemplate, justiceBoonsFieldTemplate, magicBoonsFieldTemplate, moonBoonsFieldTemplate, mysteryBoonsFieldTemplate, prophecyBoonsFieldTemplate, psychopompBoonsFieldTemplate, skyBoonsFieldTemplate, starBoonsFieldTemplate, sunBoonsFieldTemplate, thunderBoonsFieldTemplate, warBoonsFieldTemplate, waterBoonsFieldTemplate, pspBoonsFieldTemplate];
var tempOfForPrints = [epicStrengthKnacksForPrint, epicDexterityKnacksForPrint, epicStaminaKnacksForPrint, epicCharismaKnacksForPrint, epicManipulationKnacksForPrint, epicAppearanceKnacksForPrint, epicPerceptionKnacksForPrint, epicIntelligenceKnacksForPrint, epicWitsKnacksForPrint, animalBoonsForPrint, chaosBoonsForPrint, creationBoonsForPrint, darknessBoonsForPrint, deathBoonsForPrint, earthBoonsForPrint, fertilityBoonsForPrint, fireBoonsForPrint, frostBoonsForPrint, guardianBoonsForPrint, healthBoonsForPrint, illusionBoonsForPrint, justiceBoonsForPrint, magicBoonsForPrint, moonBoonsForPrint, mysteryBoonsForPrint, prophecyBoonsForPrint, psychopompBoonsForPrint, skyBoonsForPrint, starBoonsForPrint, sunBoonsForPrint, thunderBoonsForPrint, warBoonsForPrint, waterBoonsForPrint];
var tempOfArrays = [epicStrengthKnacks, epicDexterityKnacks, epicStaminaKnacks, epicCharismaKnacks, epicManipulationKnacks, epicAppearanceKnacks, epicPerceptionKnacks, epicIntelligenceKnacks, epicWitsKnacks, animalBoons, chaosBoons, creationBoons, darknessBoons, deathBoons, earthBoons, fertilityBoons, fireBoons, frostBoons, guardianBoons, healthBoons, illusionBoons, justiceBoons, magicBoons, moonBoons, mysteryBoons, prophecyBoons, psychopompBoons, skyBoons, starBoons, sunBoons, thunderBoons, warBoons, waterBoons, pspBoons];


// this accepts an input and returns 0 if the input is not a number
function nanEqualsZero(input) {
	if(isNaN(input)){
		input = 0;
	}
	return input;
}
// this accepts an input and returns the input's value on the epic scale
function convertToEpic(input) {
	switch (input) {
		case 0:
		output = 0;
		break;
		case 1:
		output = 1;
		break;
		case 2:
		output = 2;
		break;
		case 3:
		output = 4;
		break;
		case 4:
		output = 7;
		break;
		case 5:
		output = 11;
		break;
		case 6:
		output = 16;
		break;
		case 7:
		output = 22;
		break;
		case 8:
		output = 29;
		break;
		case 9:
		output = 37;
		break;
		case 10:
		output = 46;
		break;
	}
	return output;
}
// limits input to 10 or -10
function fatebondLimitTen(input) {
	var output = 0;
	if(input > 10) {
		output = 10;
	} else if(input < -10) {
		output = -10;
	} else {
		output = input;
	}
	return output;
}
// this converts the first letter of a string to capitals
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// this converts the first letter of a string to lowercase
function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
// this creates a random string with five characters and returns it
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
// this outputs the effective numberBoons
function convertToEffectiveNumberBoons(input) {
	output = 0;
	makeNegative = false;
	halveThis = false;
	if(isNaN(input) && input.indexOf("-") > -1) {
		makeNegative = true;
		input = input.replace("-", "");
	}
	if(isNaN(input) && input.indexOf("1/2") > -1) {
		halveThis = true;
		input = input.replace("1/2", "");
	}
	switch(input) {
		case "#epicappearance":
		output = parseInt(myCharacter['epicAttributes']['epicAppearance']);
		break;
		case "#epiccharisma":
		output = parseInt(myCharacter['epicAttributes']['epicCharisma']);
		break;
		case "#epicstamina":
		output = parseInt(myCharacter['epicAttributes']['epicStamina']);
		break;
		case "#legend":
		output = parseInt(myCharacter['coreTraits']['legend']);
		break;
		case "#willpower":
		output = parseInt(myCharacter['coreTraits']['willpower']);
		break;
		case "#animal":
		output = effectiveNumberAnimal;
		break;
		case "#chaos":
		output = effectiveNumberChaos;
		break;
		case "#creation":
		output = effectiveNumberCreation;
		break;
		case "#darkness":
		output = effectiveNumberDarkness;
		break;
		case "#death":
		output = effectiveNumberDeath;
		break;
		case "#earth":
		output = effectiveNumberEarth;
		break;
		case "#fertility":
		output = effectiveNumberFertility;
		break;
		case "#fire":
		output = effectiveNumberFire;
		break;
		case "#frost":
		output = effectiveNumberFrost;
		break;
		case "#guardian":
		output = effectiveNumberGuardian;
		break;
		case "#health":
		output = effectiveNumberHealth;
		break;
		case "#illusion":
		output = effectiveNumberIllusion;
		break;
		case "#justice":
		output = effectiveNumberJustice;
		break;
		case "#magic":
		output = effectiveNumberMagic;
		break;
		case "#moon":
		output = effectiveNumberMoon;
		break;
		case "#mystery":
		output = effectiveNumberMystery;
		break;
		case "#prophecy":
		output = effectiveNumberProphecy;
		break;
		case "#psychopomp":
		output = effectiveNumberPsychopomp;
		break;
		case "#sky":
		output = effectiveNumberSky;
		break;
		case "#star":
		output = effectiveNumberStar;
		break;
		case "#sun":
		output = effectiveNumberSun;
		break;
		case "#thunder":
		output = effectiveNumberThunder;
		break;
		case "#war":
		output = effectiveNumberWar;
		break;
		case "#water":
		output = effectiveNumberWater;
		break;
		case "#conviction":
		output = parseInt(myCharacter['virtues']['conviction']);
		break;
		case "#courage":
		output = parseInt(myCharacter['virtues']['courage']);
		break;
		case "#duty":
		output = parseInt(myCharacter['virtues']['duty']);
		break;
		case "#endurance":
		output = parseInt(myCharacter['virtues']['endurance']);
		break;
		case "#expression":
		output = parseInt(myCharacter['virtues']['expression']);
		break;
		case "#harmony":
		output = parseInt(myCharacter['virtues']['harmony']);
		break;
		case "#intellect":
		output = parseInt(myCharacter['virtues']['intellect']);
		break;
		case "#loyalty":
		output = parseInt(myCharacter['virtues']['loyalty']);
		break;
		case "#order":
		output = parseInt(myCharacter['virtues']['order']);
		break;
		case "#piety":
		output = parseInt(myCharacter['virtues']['piety']);
		break;
		case "#valor":
		output = parseInt(myCharacter['virtues']['valor']);
		break;
		case "#vengeance":
		output = parseInt(myCharacter['virtues']['vengeance']);
		break;
		default:
		output = input;
	}
	if(makeNegative == true) {
		output = output * -1;
	}
	if(halveThis == true) {
		output = Math.round(output / 2);
	}
	return output;
}





// these functions need to happen when any of the pages load
function onLoadFunctions() {
	ref.once("value", getCharacterList);
	fireCharacter = new Character();
}
var Character = function() {
	genExceptionsRef.once("value", getGenExceptions);
	pspPowersRef.once("value", getPspPowers);
	allPowersRef.once("value", getPowers);
}
function getPowers(snapshot) {
	powerMasterList = snapshot.val();
	getTraits();
}
function getPspPowers(snapshot) {
	pspMasterList = snapshot.val();
}
function getGenExceptions(snapshot) {
	genExceptionsMasterList = snapshot.val();
}
function getTraits() {
	usersRef.once("value", getMyTraits);
}
function getMyTraits(snapshot) {
	myCharacter = snapshot.val();
	getPantheonPurview();
	getValidChannels();
	calculate();
	writeBaseTraits();
	writeRelics();
	writeArmors();
	writeFatebonds();
	writeTempModifiers();
	writeUpdatePage();
	displayCurrentPools();
	writeDropdowns();
	writeDefenses();
	writeOtherDerivedTraitsArea();
	writePowerDetails();
}
function getCharacterList(snapshot) {
	characterList = snapshot.val();
}



//this gets the character's Pantheon Purview
function getPantheonPurview() {
	var pspPrintBoons = [];
	switch (myCharacter.characterPantheon) {
		case "Theoi":
		myCharacter['pantheonPurview'] = "Arete";
		tempOfBoonsPrint.push(areteBoonsForPrint);
		pspPrintBoons = areteBoonsForPrint;
		break;
		case "Yazata":
		myCharacter['pantheonPurview'] = "Asha";
		tempOfBoonsPrint.push(ashaBoonsForPrint);
		pspPrintBoons = ashaBoonsForPrint;
		break;
		case "Nemetondevos":
		myCharacter['pantheonPurview'] = "Deuogdonio";
		tempOfBoonsPrint.push(deuogdonioBoonsForPrint);
		pspPrintBoons = deuogdonioBoonsForPrint;
		break;
		case "Bogovi":
		myCharacter['pantheonPurview'] = "Dvoeverie";
		tempOfBoonsPrint.push(dvoeverieBoonsForPrint);
		pspPrintBoons = dvoeverieBoonsForPrint;
		break;
		case "Tuatha":
		myCharacter['pantheonPurview'] = "Enech";
		tempOfBoonsPrint.push(enechBoonsForPrint);
		pspPrintBoons = enechBoonsForPrint;
		break;
		case "Alilah":
		myCharacter['pantheonPurview'] = "Hajj";
		tempOfBoonsPrint.push(hajjBoonsForPrint);
		pspPrintBoons = hajjBoonsForPrint;
		break;
		case "Netjer":
		myCharacter['pantheonPurview'] = "Heku";
		tempOfBoonsPrint.push(hekuBoonsForPrint);
		pspPrintBoons = hekuBoonsForPrint;
		break;
		case "Apu":
		myCharacter['pantheonPurview'] = "Huaca";
		tempOfBoonsPrint.push(huacaBoonsForPrint);
		pspPrintBoons = huacaBoonsForPrint;
		break;
		case "Teotl":
		myCharacter['pantheonPurview'] = "Itztli";
		tempOfBoonsPrint.push(itztliBoonsForPrint);
		pspPrintBoons = itztliBoonsForPrint;
		break;
		case "Aesir":
		myCharacter['pantheonPurview'] = "Jotunblut";
		tempOfBoonsPrint.push(jotunblutBoonsForPrint);
		pspPrintBoons = jotunblutBoonsForPrint;
		break;
		case "Elohim":
		myCharacter['pantheonPurview'] = "Malak";
		tempOfBoonsPrint.push(malakBoonsForPrint);
		pspPrintBoons = malakBoonsForPrint;
		break;
		case "Atua":
		myCharacter['pantheonPurview'] = "Mana";
		tempOfBoonsPrint.push(manaBoonsForPrint);
		pspPrintBoons = manaBoonsForPrint;
		break;
		case "Annuna":
		myCharacter['pantheonPurview'] = "Me";
		tempOfBoonsPrint.push(meBoonsForPrint);
		pspPrintBoons = meBoonsForPrint;
		break;
		case "Orisha":
		myCharacter['pantheonPurview'] = "Ori";
		tempOfBoonsPrint.push(oriBoonsForPrint);
		pspPrintBoons = oriBoonsForPrint;
		break;
		case "Deva":
		myCharacter['pantheonPurview'] = "Samsara";
		tempOfBoonsPrint.push(samsaraBoonsForPrint);
		pspPrintBoons = samsaraBoonsForPrint;
		break;
		case "Inue":
		myCharacter['pantheonPurview'] = "Shua";
		tempOfBoonsPrint.push(shuaBoonsForPrint);
		pspPrintBoons = shuaBoonsForPrint;
		break;
		case "Kuh":
		myCharacter['pantheonPurview'] = "Talich";
		tempOfBoonsPrint.push(talichBoonsForPrint);
		pspPrintBoons = talichBoonsForPrint;
		break;
		case "Kami":
		myCharacter['pantheonPurview'] = "Tsukumogami";
		tempOfBoonsPrint.push(tsukumogamiBoonsForPrint);
		pspPrintBoons = tsukumogamiBoonsForPrint;
		break;
		case "Shen":
		myCharacter['pantheonPurview'] = "Wuxing";
		tempOfBoonsPrint.push(wuxingBoonsForPrint);
		pspPrintBoons = wuxingBoonsForPrint;
		break;
	}
	document.getElementById('pspBoonsHeader').innerHTML = myCharacter.pantheonPurview;
	document.getElementById('pspBoonsTitle').innerHTML = myCharacter.pantheonPurview;
	document.getElementById('psp1Label').innerHTML = pspPrintBoons[0];
	document.getElementById('psp2Label').innerHTML = pspPrintBoons[1];
	document.getElementById('psp3Label').innerHTML = pspPrintBoons[2];
	document.getElementById('psp4Label').innerHTML = pspPrintBoons[3];
	document.getElementById('psp5Label').innerHTML = pspPrintBoons[4];
	document.getElementById('psp6Label').innerHTML = pspPrintBoons[5];
	document.getElementById('psp7Label').innerHTML = pspPrintBoons[6];
	document.getElementById('psp8Label').innerHTML = pspPrintBoons[7];
	document.getElementById('psp9Label').innerHTML = pspPrintBoons[8];
	document.getElementById('psp10Label').innerHTML = pspPrintBoons[9];
}
// this writes the Base Traits page
function writeBaseTraits() {

	document.getElementById('pantheonBase').innerHTML = myCharacter.characterPantheon;
	coreTraitsIndex = myCharacter.coreTraits;
	for(var traitName in coreTraitsIndex) {
		baseBuilder = traitName + "Base";
		document.getElementById(baseBuilder).innerHTML = coreTraitsIndex[traitName];
	}
	attributesIndex = myCharacter.attributes;
	for(var traitName in attributesIndex) {
		baseBuilder = traitName + "Base";
		document.getElementById(baseBuilder).innerHTML = attributesIndex[traitName];
	}
	epicAttributesIndex = myCharacter.epicAttributes;
	for(var traitName in epicAttributesIndex) {
		baseBuilder = traitName + "Base";
		document.getElementById(baseBuilder).innerHTML = epicAttributesIndex[traitName];
	}
	skillsIndex = myCharacter.skills;
	for(var traitName in skillsIndex) {
		baseBuilder = traitName + "Base";
		document.getElementById(baseBuilder).innerHTML = skillsIndex[traitName];
	}
	virtuesIndex = myCharacter.virtues;
	for(var traitName in virtuesIndex) {
		baseBuilder = traitName + "Base";
		document.getElementById(baseBuilder).innerHTML = virtuesIndex[traitName];
	}
	knacksIndex = myCharacter.knacks;
	exceptionRequiredItems = "";
	modifiesSheetItems = "";
	for(var categoryName in knacksIndex) {
		knacksBaseBuilder = categoryName + "KnacksBase";
		knackListPosition = tempOfKnacks.indexOf(categoryName + "Knacks");
		templateListToUse = tempOfKnacksTemplates[knackListPosition]
		forPrintListToUse = tempOfKnacksPrint[knackListPosition];
		knackListPrint = "<br>";
		knackNamePrint = "";
		for(var knackName in knacksIndex[categoryName]) {
			if(knacksIndex[categoryName][knackName] == true) {
				knackPosition = templateListToUse.indexOf(knackName);
				knackNamePrint = forPrintListToUse[knackPosition];
				knackListPrint += knackNamePrint + "<br>";
				if(powerMasterList[categoryName][knackName]['exceptionRequired'] == true) {
					exceptionRequiredItems += forPrintListToUse[knackPosition] + ", ";
				}
				if(powerMasterList[categoryName][knackName]['modifiesSheet'] == true) {
					modifiesSheetItems += forPrintListToUse[knackPosition] + ", ";
				}
			}
		}
		document.getElementById(knacksBaseBuilder).innerHTML = knackListPrint;
	}
	boonsIndex = myCharacter.boons;
	for(var categoryName in boonsIndex) {
		boonsBaseBuilder = categoryName + "BoonsBase";
		boonListPosition = tempOfBoons.indexOf(categoryName + "Boons");
		templateListToUse = tempOfBoonsTemplates[boonListPosition]
		forPrintListToUse = tempOfBoonsPrint[boonListPosition];
		boonListPrint = "<br>";
		boonNamesToPrint = [];
		boonNamePrint = "";
		for(var boonName in boonsIndex[categoryName]) {
			if(boonsIndex[categoryName][boonName] == true) {
				boonPosition = templateListToUse.indexOf(boonName);
				boonNamesToPrint.push(forPrintListToUse[boonPosition]);
				boonNamesToPrint.sort();
				if(powerMasterList[categoryName][boonName]['requiresException'] == true) {
					exceptionRequiredItems += forPrintListToUse[boonPosition] + ", ";
				}
				if(powerMasterList[categoryName][boonName]['modifiesSheet'] == true) {
					modifiesSheetItems += forPrintListToUse[boonPosition] + ", ";
				}
			}
		}
		for(i = 0; i < boonNamesToPrint.length; i++) {
			boonNamePrint = boonNamesToPrint[i];
			boonListPrint += boonNamePrint + "<br>";
		}
		document.getElementById(boonsBaseBuilder).innerHTML = boonListPrint;
		document.getElementById('exceptionRequiredList').innerHTML = exceptionRequiredItems;
		document.getElementById('modifiesSheetList').innerHTML = modifiesSheetItems;
	}
}
// this writes the Relics page
function writeRelics() {
	relicList = "<br><ul id=\"printedRelicList\" class=\"relicList\">";
	relicsIndex = myCharacter.relics;
	for(var relicName in relicsIndex) {
		relicList += "<li ";
		if(relicsIndex[relicName]['enabled'] == false) {
			relicList += "class=\"disabledRelic\" ";
		}
		relicList += "id=\"" + relicName + "\"><span style=\"font-weight: bold; font-size: 1.3em;\">" + relicName + "</span> - Rank " + relicsIndex[relicName]['relicLevel'] + " Birthright ";
		if(relicsIndex[relicName]['inherent'] == false) {
			if(relicsIndex[relicName]['enabled'] == true) {
				relicList += "<button onclick=\"disableRelic(this)\" data-id=\"" + relicName + "\">-</button>";
			} else {
				relicList += "<button onclick=\"enableRelic(this)\" data-id=\"" + relicName + "\">+</button>";
			}
		}
		relicList += "<ul>";
		if(relicsIndex[relicName]['inherent'] == true) {
			relicList += "<li>Inherent Birthright</li>"
		}
		if(relicsIndex[relicName]['remoteAccess'] == true) {
			relicList += "<li>Powers and Boons can be used without possessing the Birthright</li>"
		}
		for(var channelName in relicsIndex[relicName]['channels']) {
			channelName = capitalizeFirstLetter(channelName);
			relicList += "<li>Channels the " + channelName + " Purview</li>";
		}
		for(var bonusDiceName in relicsIndex[relicName]['bonusDice']) {
			bonusDiceString = relicsIndex[relicName]['bonusDice'][bonusDiceName];
			bonusDiceString = "#" + capitalizeFirstLetter(bonusDiceString.replace("#", ""));
			relicList += "<li>Add " + bonusDiceString;
			relicList += " bonus dice to " + capitalizeFirstLetter(bonusDiceName) + "</li>";
		}
		for(var bonusBoonsName in relicsIndex[relicName]['relicBoons']) {
			bonusBoonsString = relicsIndex[relicName]['relicBoons'][bonusBoonsName].replace("number",  "#");
			relicList += "<li>Add " + bonusBoonsString;
			relicList += " bonus #Boons to " + capitalizeFirstLetter(bonusBoonsName).replace("Number", "") + "</li>";
		}
		for(var bonusItemName in relicsIndex[relicName]['itemEnhancements']) {
			relicList += "<li> Add +" + relicsIndex[relicName]['itemEnhancements'][bonusItemName];
			relicList += " bonus to " + bonusItemName + "</li>";
		}
		for(var miscPropName in relicsIndex[relicName]['miscProperties']) {
			relicList += "<li>" + relicsIndex[relicName]['miscProperties'][miscPropName] + "</li>";
		}
		relicList += "</ul>";
		relicList += "<br>";
	}
	relicList += "</ul>"
	document.getElementById('currentRelicsDisplay').innerHTML = relicList;
}
// this writes the armors
function writeArmors() {
	armorIndex = myCharacter.armors;
	armorList = "<br><ul id=\"printedArmorList\" class=\"relicList\">";
	for(var armorName in armorIndex) {
		armorList += "<li ";
		if(armorIndex[armorName]['enabled'] == false) {
			armorString += "class=\"disabledRelic\" ";
		}
		armorList += "id=\"" + armorName + "\"><span style=\"font-weight: bold; font-size: 1.3em;\">" + armorName + "</span>";
		if(armorIndex[armorName]['enabled'] == true) {
			armorList += " <button onclick=\"disableArmor(this)\" data-id=\"" + armorName + "\">-</button>";
		} else {
			armorList += " <button onclick=\"disableArmor(this)\" data-id=\"" + armorName + "\">-</button>";
		}
		armorList += "<ul>";
		armorList +="<li>Base Bashing Soak: " + armorIndex[armorName]['bSoak'] + "</li>"
		armorList +="<li>Base Lethal Soak: " + armorIndex[armorName]['lSoak'] + "</li>"
		armorList +="<li>Base Aggravated Soak: " + armorIndex[armorName]['aSoak'] + "</li>"
		armorList +="<li>Mobility Penalty: " + armorIndex[armorName]['mobilityPenalty'] + "</li>"
		armorList += "</ul></li><br>"
	}
	armorList += "</ul>";
	document.getElementById('currentArmorDisplay').innerHTML = armorList;
}
// this writes the Fatebonds page
function writeFatebonds() {
	fatebondsList = "<ul class=\"fatebondList\">";
	fatebondsIndex = myCharacter.fatebonds;
	for(var fatebondName in fatebondsIndex) {
		fatebondSource = fatebondsIndex[fatebondName]['fatebondSource'];
		fatebondLevel = fatebondsIndex[fatebondName]['fatebondLevel'];
		fatebondBonus = fatebondsIndex[fatebondName]['fatebondBonus'];
		fatebondPenalty = fatebondsIndex[fatebondName]['fatebondPenalty'];
		fatebondsList += "<li id=\"" + fatebondName + "\">";
		fatebondsList += "Fatebond: <strong>" + fatebondSource + "</strong><br>";
		fatebondsList += "Level: <strong>" + fatebondLevel + "</strong> ";
		fatebondsList += "Bonus: <span style=\"color: #0000FF\">" + fatebondBonus + "</span> ";
		fatebondsList += "Penalty: <span style=\"color: #FF0000\">" + fatebondPenalty + "</span> ";
		fatebondsList +=  "<button onclick=\"removeFatebond(this)\" data-id=\"" + fatebondName + "\">Remove</button></li>";
		fatebondsList += "<br>";
	}
	fatebondsList += "</ul>"
	document.getElementById('currentFatebondsDisplay').innerHTML = fatebondsList;
}
// this writes the Temp Modifiers page
function writeTempModifiers() {
	tempModList = "<ul>";
	tempModIndex = myCharacter.tempModifier;
	for(var tempName in tempModIndex) {
		tempModifier = tempModIndex[tempName]['tempModifier'];
		tempModifierLevel = tempModIndex[tempName]['tempModifierLevel'];
		tempModifierSource = tempModIndex[tempName]['tempModifierSource'];
		tempModifierType = tempModIndex[tempName]['tempModifierType']
		tempModifierType = tempModifierType.replace("bonus", "");
		tempModifierType = tempModifierType.replace("Boons", "#Boons");
		tempModifierDuration = capitalizeFirstLetter(tempModIndex[tempName]['tempModifierDuration']);
		tempModList += "<li id=\"" + tempName + "\">";
		tempModList += "Source: <strong>" + tempModifierSource + "</strong><br>";
		tempModList += tempModifierLevel + " ";
		tempModList += tempModifierType + " ";
		tempModList += tempModifier + " ";
		tempModList += "<br>";
		tempModList += "Lasts for: " + tempModifierDuration + " ";
		tempModList += "<button onclick=\"removeTempModifier(this)\" data-id=\"" + tempName + "\">Remove</button>"
		tempModList += "</li>";
	}
	tempModList += "</ul>"
	document.getElementById('currentTempModifierDisplay').innerHTML = tempModList;
}
// this populates default powers on the Update page
function writeUpdatePage() {
	document.getElementById('friendlyGroupDesignation').innerHTML = myCharacter['friendly'];

	document.getElementById('legendEntry').value = myCharacter['coreTraits']['legend'];
	document.getElementById('willpowerEntry').value = myCharacter['coreTraits']['willpower'];

	document.getElementById('strengthEntry').value = myCharacter['attributes']['strength'];
	document.getElementById('dexterityEntry').value = myCharacter['attributes']['dexterity'];
	document.getElementById('staminaEntry').value = myCharacter['attributes']['stamina'];
	document.getElementById('charismaEntry').value = myCharacter['attributes']['charisma'];
	document.getElementById('manipulationEntry').value = myCharacter['attributes']['manipulation'];
	document.getElementById('appearanceEntry').value = myCharacter['attributes']['appearance'];
	document.getElementById('perceptionEntry').value = myCharacter['attributes']['perception'];
	document.getElementById('intelligenceEntry').value = myCharacter['attributes']['intelligence'];
	document.getElementById('witsEntry').value = myCharacter['attributes']['wits'];

	document.getElementById('academicsEntry').value = myCharacter['skills']['academics'];
	document.getElementById('animalkenEntry').value = myCharacter['skills']['animalken'];
	document.getElementById('artEntry').value = myCharacter['skills']['art'];
	document.getElementById('athleticsEntry').value = myCharacter['skills']['athletics'];
	document.getElementById('awarenessEntry').value = myCharacter['skills']['awareness'];
	document.getElementById('brawlEntry').value = myCharacter['skills']['brawl'];
	document.getElementById('commandEntry').value = myCharacter['skills']['command'];
	document.getElementById('controlEntry').value = myCharacter['skills']['control'];
	document.getElementById('craftEntry').value = myCharacter['skills']['craft'];
	document.getElementById('empathyEntry').value = myCharacter['skills']['empathy'];
	document.getElementById('fortitudeEntry').value = myCharacter['skills']['fortitude'];
	document.getElementById('integrityEntry').value = myCharacter['skills']['integrity'];
	document.getElementById('investigationEntry').value = myCharacter['skills']['investigation'];
	document.getElementById('larcenyEntry').value = myCharacter['skills']['larceny'];
	document.getElementById('marksmanshipEntry').value = myCharacter['skills']['marksmanship'];
	document.getElementById('medicineEntry').value = myCharacter['skills']['medicine'];
	document.getElementById('meleeEntry').value = myCharacter['skills']['melee'];
	document.getElementById('occultEntry').value = myCharacter['skills']['occult'];
	document.getElementById('politicsEntry').value = myCharacter['skills']['politics'];
	document.getElementById('presenceEntry').value = myCharacter['skills']['presence'];
	document.getElementById('scienceEntry').value = myCharacter['skills']['science'];
	document.getElementById('stealthEntry').value = myCharacter['skills']['stealth'];
	document.getElementById('survivalEntry').value = myCharacter['skills']['survival'];
	document.getElementById('thrownEntry').value = myCharacter['skills']['thrown'];

	document.getElementById('epicStrengthEntry').value = myCharacter['epicAttributes']['epicStrength'];
	document.getElementById('epicDexterityEntry').value = myCharacter['epicAttributes']['epicDexterity'];
	document.getElementById('epicStaminaEntry').value = myCharacter['epicAttributes']['epicStamina'];
	document.getElementById('epicCharismaEntry').value = myCharacter['epicAttributes']['epicCharisma'];
	document.getElementById('epicManipulationEntry').value = myCharacter['epicAttributes']['epicManipulation'];
	document.getElementById('epicAppearanceEntry').value = myCharacter['epicAttributes']['epicAppearance'];
	document.getElementById('epicPerceptionEntry').value = myCharacter['epicAttributes']['epicPerception'];
	document.getElementById('epicIntelligenceEntry').value = myCharacter['epicAttributes']['epicIntelligence'];
	document.getElementById('epicWitsEntry').value = myCharacter['epicAttributes']['epicWits'];

	document.getElementById('convictionEntry').value = myCharacter['virtues']['conviction'];
	document.getElementById('courageEntry').value = myCharacter['virtues']['courage'];
	document.getElementById('dutyEntry').value = myCharacter['virtues']['duty'];
	document.getElementById('enduranceEntry').value = myCharacter['virtues']['endurance'];
	document.getElementById('expressionEntry').value = myCharacter['virtues']['expression'];
	document.getElementById('harmonyEntry').value = myCharacter['virtues']['harmony'];
	document.getElementById('intellectEntry').value = myCharacter['virtues']['intellect'];
	document.getElementById('loyaltyEntry').value = myCharacter['virtues']['loyalty'];
	document.getElementById('orderEntry').value = myCharacter['virtues']['order'];
	document.getElementById('pietyEntry').value = myCharacter['virtues']['piety'];
	document.getElementById('valorEntry').value = myCharacter['virtues']['valor'];
	document.getElementById('vengeanceEntry').value = myCharacter['virtues']['vengeance'];
	document.getElementById('ambitionEntry').value = myCharacter['virtues']['ambition'];
	document.getElementById('anarchyEntry').value = myCharacter['virtues']['anarchy'];
	document.getElementById('apathyEntry').value = myCharacter['virtues']['apathy'];
	document.getElementById('cowardiceEntry').value = myCharacter['virtues']['cowardice'];
	document.getElementById('destructionEntry').value = myCharacter['virtues']['destruction'];
	document.getElementById('discordEntry').value = myCharacter['virtues']['discord'];
	document.getElementById('heresyEntry').value = myCharacter['virtues']['heresy'];
	document.getElementById('ignoranceEntry').value = myCharacter['virtues']['ignorance'];
	document.getElementById('maliceEntry').value = myCharacter['virtues']['malice'];
	document.getElementById('rapacityEntry').value = myCharacter['virtues']['rapacity'];
	document.getElementById('treacheryEntry').value = myCharacter['virtues']['treachery'];
	document.getElementById('tyrannyEntry').value = myCharacter['virtues']['tyranny'];

	knacksIndex = myCharacter['knacks'];
	for(var knackCat in knacksIndex) {
		knackCatIndex = myCharacter['knacks'][knackCat];
		for(var knacks in knackCatIndex) {
			if(myCharacter['knacks'][knackCat][knacks] == true) {
				entryBuilder = knacks + "Entry";
				document.getElementById(entryBuilder).checked = true;
			}
		}
	}
	boonsIndex = myCharacter['boons'];
	for(var boonsCat in boonsIndex) {
		boonsCatIndex = myCharacter['boons'][boonsCat];
		for(var boons in boonsCatIndex) {
			if(myCharacter['boons'][boonsCat][boons] == true) {
				entryBuilder = boons + "Entry";
				document.getElementById(entryBuilder).checked = true;
			}
		}
	}
}
// this shows current values at bottom of preset rolls tab
function displayCurrentPools() {
	currentPools = "";

	currentPools += "Legend Dice = " + effectiveLegendDice + "<br>";
	currentPools += "Willpower Dice = " + effectiveWillpowerDice + "<br>";
	currentPools += "<br>";

	currentPools += "Strength Dice = " + effectiveStrengthDice + " [" + effectiveStrengthSucc + "]" + "<br>";
	currentPools += "Dexterity Dice = " + effectiveDexterityDice + " [" + effectiveDexteritySucc + "]" + "<br>";
	currentPools += "Stamina Dice = " + effectiveStaminaDice + " [" + effectiveStaminaSucc + "]" + "<br>";
	currentPools += "Charisma Dice = " + effectiveCharismaDice + " [" + effectiveCharismaSucc + "]" + "<br>";
	currentPools += "Manipulation Dice = " + effectiveManipulationDice + " [" + effectiveManipulationSucc + "]" + "<br>";
	currentPools += "Appearance Dice = " + effectiveAppearanceDice + " [" + effectiveAppearanceSucc + "]" + "<br>";
	currentPools += "Perception Dice = " + effectivePerceptionDice + " [" + effectivePerceptionSucc + "]" + "<br>";
	currentPools += "Intelligence Dice = " + effectiveIntelligenceDice + " [" + effectiveIntelligenceSucc + "]" + "<br>";
	currentPools += "Wits Dice = " + effectiveWitsDice + " [" + effectiveWitsSucc + "]" + "<br>";
	currentPools += "<br>";

	currentPools += "Academics Dice = " + effectiveAcademicsDice + "<br>";
	currentPools += "Animal Ken Dice = " + effectiveAnimalkenDice + "<br>";
	currentPools += "Art Dice = " + effectiveArtDice + "<br>";
	currentPools += "Athletics Dice = " + effectiveAthleticsDice + "<br>";
	currentPools += "Awareness Dice = " + effectiveAwarenessDice + "<br>";
	currentPools += "Brawl Dice = " + effectiveBrawlDice + "<br>";
	currentPools += "Command Dice = " + effectiveCommandDice + "<br>";
	currentPools += "Control Dice = " + effectiveControlDice + "<br>";
	currentPools += "Craft Dice = " + effectiveCraftDice + "<br>";
	currentPools += "Empathy Dice = " + effectiveEmpathyDice + "<br>";
	currentPools += "Fortitude Dice = " + effectiveFortitudeDice + "<br>";
	currentPools += "Integrity Dice = " + effectiveIntegrityDice + "<br>";
	currentPools += "Investigation Dice = " + effectiveInvestigationDice + "<br>";
	currentPools += "Larceny Dice = " + effectiveLarcenyDice + "<br>";
	currentPools += "Marksmanship Dice = " + effectiveMarksmanshipDice + "<br>";
	currentPools += "Medicine Dice = " + effectiveMedicineDice + "<br>";
	currentPools += "Melee Dice = " + effectiveMeleeDice + "<br>";
	currentPools += "Occult Dice = " + effectiveOccultDice + "<br>";
	currentPools += "Politics Dice = " + effectivePoliticsDice + "<br>";
	currentPools += "Presence Dice = " + effectivePresenceDice + "<br>";
	currentPools += "Science Dice = " + effectiveScienceDice + "<br>";
	currentPools += "Stealth Dice = " + effectiveStealthDice + "<br>";
	currentPools += "Survival Dice = " + effectiveSurvivalDice + "<br>";
	currentPools += "Thrown Dice = " + effectiveThrownDice + "<br>";
	currentPools += "<br>";

	currentPools += "Bonus Dice to Animal Boons = " + effectiveAnimalDice + "<br>";
	currentPools += "Bonus Dice to Chaos Boons = " + effectiveChaosDice + "<br>";
	currentPools += "Bonus Dice to Creation Boons = " + effectiveCreationDice + "<br>";
	currentPools += "Bonus Dice to Darkness Boons = " + effectiveDarknessDice + "<br>";
	currentPools += "Bonus Dice to Death Boons = " + effectiveDeathDice + "<br>";
	currentPools += "Bonus Dice to Earth Boons = " + effectiveEarthDice + "<br>";
	currentPools += "Bonus Dice to Fertility Boons = " + effectiveFertilityDice + "<br>";
	currentPools += "Bonus Dice to Fire Boons = " + effectiveFireDice + "<br>";
	currentPools += "Bonus Dice to Frost Boons = " + effectiveFrostDice + "<br>";
	currentPools += "Bonus Dice to Guardian Boons = " + effectiveGuardianDice + "<br>";
	currentPools += "Bonus Dice to Health Boons = " + effectiveHealthDice + "<br>";
	currentPools += "Bonus Dice to Illusion Boons = " + effectiveIllusionDice + "<br>";
	currentPools += "Bonus Dice to Justice Boons = " + effectiveJusticeDice + "<br>";
	currentPools += "Bonus Dice to Magic Boons = " + effectiveMagicDice + "<br>";
	currentPools += "Bonus Dice to Moon Boons = " + effectiveMoonDice + "<br>";
	currentPools += "Bonus Dice to Mystery Boons = " + effectiveMysteryDice + "<br>";
	currentPools += "Bonus Dice to Prophecy Boons = " + effectiveProphecyDice + "<br>";
	currentPools += "Bonus Dice to Psychopomp Boons = " + effectivePsychopompDice + "<br>";
	currentPools += "Bonus Dice to Sky Boons = " + effectiveSkyDice + "<br>";
	currentPools += "Bonus Dice to Star Boons = " + effectiveStarDice + "<br>";
	currentPools += "Bonus Dice to Sun Boons = " + effectiveSunDice + "<br>";
	currentPools += "Bonus Dice to Thunder Boons = " + effectiveThunderDice + "<br>";
	currentPools += "Bonus Dice to War Boons = " + effectiveWarDice + "<br>";
	currentPools += "Bonus Dice to Water Boons = " + effectiveWaterDice + "<br>";
	currentPools += "<br>";

	currentPools += "#Animal = " + effectiveNumberAnimal + "<br>";
	currentPools += "#Chaos = " + effectiveNumberChaos + "<br>";
	currentPools += "#Creation  = " + effectiveNumberCreation + "<br>";
	currentPools += "#Darkness = " + effectiveNumberDarkness + "<br>";
	currentPools += "#Death = " + effectiveNumberDeath + "<br>";
	currentPools += "#Earth = " + effectiveNumberEarth + "<br>";
	currentPools += "#Fertility = " + effectiveNumberFertility + "<br>";
	currentPools += "#Fire = " + effectiveNumberFire + "<br>";
	currentPools += "#Frost = " + effectiveNumberFrost + "<br>";
	currentPools += "#Guardian = " + effectiveNumberGuardian + "<br>";
	currentPools += "#Health = " + effectiveNumberHealth + "<br>";
	currentPools += "#Illusion = " + effectiveNumberIllusion + "<br>";
	currentPools += "#Justice = " + effectiveNumberJustice + "<br>";
	currentPools += "#Magic = " + effectiveNumberMagic + "<br>";
	currentPools += "#Moon = " + effectiveNumberMoon + "<br>";
	currentPools += "#Mystery = " + effectiveNumberMystery + "<br>";
	currentPools += "#Prophecy = " + effectiveNumberProphecy + "<br>";
	currentPools += "#Psychopomp = " + effectiveNumberPsychopomp + "<br>";
	currentPools += "#Sky = " + effectiveNumberSky + "<br>";
	currentPools += "#Star = " + effectiveNumberStar + "<br>";
	currentPools += "#Sun = " + effectiveNumberSun + "<br>";
	currentPools += "#Thunder = " + effectiveNumberThunder + "<br>";
	currentPools += "#War = " + effectiveNumberWar + "<br>";
	currentPools += "#Water = " + effectiveNumberWater + "<br>";
	currentPools += "<br>";

	currentPools += "Conviction = " + effectiveConvictionDice + "<br>";
	currentPools += "Courage = " + effectiveCourageDice + "<br>";
	currentPools += "Duty = " + effectiveDutyDice + "<br>";
	currentPools += "Endurance = " + effectiveEnduranceDice + "<br>";
	currentPools += "Expression = " + effectiveExpressionDice + "<br>";
	currentPools += "Harmony = " + effectiveHarmonyDice + "<br>";
	currentPools += "Intellect = " + effectiveIntellectDice + "<br>";
	currentPools += "Loyalty = " + effectiveLoyaltyDice + "<br>";
	currentPools += "Order = " + effectiveOrderDice + "<br>";
	currentPools += "Piety = " + effectivePietyDice + "<br>";
	currentPools += "Valor = " + effectiveValorDice + "<br>";
	currentPools += "Vengeance = " + effectiveVengeanceDice + "<br>";
	currentPools += "Ambition = " + effectiveAmbitionDice + "<br>";
	currentPools += "Anarchy = " + effectiveAnarchyDice + "<br>";
	currentPools += "Apathy = " + effectiveApathyDice + "<br>";
	currentPools += "Cowardice = " + effectiveCowardiceDice + "<br>";
	currentPools += "Destruction = " + effectiveDestructionDice + "<br>";
	currentPools += "Discord = " + effectiveDiscordDice + "<br>";
	currentPools += "Heresy = " + effectiveHeresyDice + "<br>";
	currentPools += "Ignorance = " + effectiveIgnoranceDice + "<br>";
	currentPools += "Malice = " + effectiveMaliceDice + "<br>";
	currentPools += "Rapacity = " + effectiveRapacityDice + "<br>";
	currentPools += "Treachery = " + effectiveTreacheryDice + "<br>";
	currentPools += "Tyranny = " + effectiveTyrannyDice + "<br>";

	document.getElementById('displayMyCharacterValuesHere').innerHTML = currentPools;
}
// this populates any lists that may be dependent on data
function writeDropdowns() {
	// this writes the dropdown that lets you select which Relic you are adding a property to
	relicsIndex = myCharacter.relics;
	relicUpdateDropdown = "";
	for(var relicName in relicsIndex) {
		relicUpdateDropdown += "<option value=\"" + relicName + "\">" + relicName + "</option>";
	}
	document.getElementById('relicPropertyEntry').innerHTML = relicUpdateDropdown;

	virtuesIndex = myCharacter.virtues;
	virtuesDropdown = "<label>Virtue Channel?</label><select id=\"virtueChannelEntry\">";
	virtuesDropdown += "<option value=\"ChooseOne\">Choose One</option>";
	for(var virtueName in virtuesIndex) {
		if(virtuesIndex[virtueName] != 0) {
			virtuesDropdown += "<option value=\"" + virtueName + "\">" + capitalizeFirstLetter(virtueName) + "</option>";
		}
	}
	document.getElementById('virtueChannelPlaceholder').innerHTML = virtuesDropdown;

	relicModList = "";
	relicModList += document.getElementById('relicBonusSelector3').innerHTML;

	attacksIndex = myCharacter.attacks;
	attackSelectorList = "<option value=\"ChooseOne\">Choose One</option>";
	damageSelectorList = "<option value=\"ChooseOne\">Choose One</option>";
	for(var attackName in attacksIndex) {
		attackSelectorList += "<option value=\"" + attackName + "\">" + attackName + "</option>";
		damageSelectorList += "<option value=\"" + attackName + "\">" + attackName + "</option>";
		relicModList += "<option value=\"" + attackName + "Attack\">" + attackName + " Attack</option>";
		relicModList += "<option value=\"" + attackName + "Damage\">" + attackName + " Damage</option>";
		relicModList += "<option value=\"" + attackName + "Parry\">" + attackName + " Parry</option>";
	}
	document.getElementById('attackRollEntry').innerHTML = attackSelectorList;
	document.getElementById('damageRollEntry').innerHTML = damageSelectorList;

	for(var armorName in myCharacter['armors']) {
		relicModList += "<option value=\"" + armorName + "Soak\">" + armorName + " Soak</option>";
	}

	document.getElementById('relicBonusSelector3').innerHTML = relicModList;


	presetList = "";
	presetList += "<option value=\"ChooseOne\">Choose One</option>";
	presetList += "<option value=\"mentalResist\">Mental Resist</option>";
	if(myCharacter['knacks']['epicIntelligence']['intellectualJuggernaut'] == true) {
		presetList += "<option value=\"intellectualJuggernaut\">MR (Intellectual Juggernaut)</option>";
	}
	presetList += "<option value=\"socialResist\">Social Resist</option>";
	if(myCharacter['knacks']['epicManipulation']['wordsWillNeverHurtMe'] == true) {
		presetList += "<option value=\"wordsWillNeverHurtMe\">SR (Words Will Never...)</option>";
	}
	if(myCharacter['knacks']['epicWits']['rapierWit'] == true) {
		presetList += "<option value=\"rapierWit\">SR (Rapier Wit)</option>";
	}
	if(myCharacter['knacks']['epicIntelligence']['blockadeOfReason'] == true) {
		presetList += "<option value=\"blockadeOfReason\">SR (Blockade of Reason)</option>";
	}
	presetList += "<option value=\"physicalResist\">Physical Resist</option>";
	if(myCharacter['boons']['sun']['unflinchingGaze'] == true) {
		presetList += "<option value=\"unflinchingGaze\">PR vs. Light</option>";
	}
	presetList += "<option value=\"joinBattle\">Join Battle</option>";
	presetList += "<option value=\"featOfStrength\">Feat of Strength</option>";
	presetList += "<option value=\"numberFate\">#Fate</option>";
	presetList += "<option value=\"escapeFromGrapple\">Escape from Grapple</option>";
	document.getElementById('rollerPresetEntry').innerHTML = presetList;

	fatiguePenaltyString = "";
	if(numberMystery > 0) {
		fatiguePenaltyString += "<button onclick=\"addNewTempModifier('-1/2#mystery', 'bonusDice', 'Mystery Fatigue Penalty', '" + getFatiguePenalty() + "', 'story'), location.reload()\">Add Mystery Fatigue Penalty</button>";
		fatiguePenaltyString += "<br><br>";
	}
	if(numberProphecy > 0) {
		fatiguePenaltyString += "<button onclick=\"addNewTempModifier('-1/2#prophecy', 'bonusDice', 'Prophecy Fatigue Penalty', '" + getFatiguePenalty() + "', 'story'), location.reload()\">Add Prophecy Fatigue Penalty</button>";
		fatiguePenaltyString += "<br><br>";
	}
	document.getElementById('fatiguePenaltyAdder').innerHTML = fatiguePenaltyString;

	rollExtraString = "";
	if(myCharacter['boons']['mystery']['spiritualFortitude'] == true) {
		rollExtraString += "<input id=\"spiritualFortitudeExtraEntry\" type=\"checkbox\"><label>Spiritual Fortitude? (MR & SR only)</label><br>"
	}
	if(myCharacter['boons']['magic']['bonaFortuna'] == true && myValidChannelsList['magic'] == true) {
		rollExtraString += "<input id=\"bonaFortunaExtraEntry\" type=\"checkbox\"><label>Bona Fortuna +" + effectiveNumberMagic + " Dice</label><br>";
	}
	if(myCharacter['boons']['star']['luckyStar'] == true && myValidChannelsList['star'] == true) {
		rollExtraString += "<input id=\"luckyStarExtraEntry\" type=\"checkbox\"><label>Lucky Star +" + effectiveNumberStar + " Dice</label><br>";
	}
	if(myCharacter['boons']['psp']['pspLevel2'] == true && myCharacter['characterPantheon'] == "Deva") {
		rollExtraString += "<input id=\"karmaExtraEntry\" type=\"checkbox\"><label>Karma +" + parseInt(myCharacter['coreTraits']['legend']) + " Dice to Virtue Channel</label><br>"
	}
	rollExtraString += "<br>";
	document.getElementById('rollExtraModalExtras').innerHTML = rollExtraString;
}
// this gets a Fatiue Penalty
function getFatiguePenalty() {
	output = "";
	penaltyValue = Math.floor((Math.random() * 10) + 1);
	switch(penaltyValue) {
		case 1:
		output = "Strength";
		break;
		case 2:
		output = "Dexterity";
		break;
		case 3:
		output = "Stamina";
		break;
		case 4:
		output = "Charisma";
		break;
		case 5:
		output = "Manipulation";
		break;
		case 6:
		output = "Appearance";
		break;
		case 7:
		output = "Perception";
		break;
		case 8:
		output = "Intelligence";
		break;
		case 9:
		output = "Wits";
		break;
		case 10:
		output = "No Penalty";
		break;
	}
	return output;
}
// this populates the defenses in the Defenses section

function writeDefenses() {
	baseDodgeDv = Math.round((myCharacter['attributes']['dexterity'] + myCharacter['skills']['athletics']) / 2) + convertToEpic(myCharacter['epicAttributes']['epicDexterity']);

	adjustedMobilityPenalty = 0;
	for(var armorName in myCharacter['armors']) {
		if(myCharacter['armors'][armorName]['enabled'] == true) {
			adjustedMobilityPenalty = parseInt(nanEqualsZero(myCharacter['armors'][armorName]['mobilityPenalty']));
		}
	}
	if(myCharacter['knacks']['epicStrength']['kingsOfMetal'] == true) {
		adjustedMobilityPenalty = 0;
	}
	tempDodgeDv = 0;
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "DodgeDv") {
			tempDodgeDv += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
		}
	}
	relicDodgeDv = 0;
	for(var relicName in myCharacter['relics']) {
		if(myCharacter['relics'][relicName]['enabled'] == true) {
			for(var bonusDice in myCharacter['relics'][relicName]['bonusDice']) {
				if(bonusDice == "dodgeDv") {
					relicDodgeDv += convertToEffectiveNumberBoons(myCharacter['relics'][relicName]['bonusDice'][bonusDice]);
				}
			}
		}
	}

	adjustedDodgeDv = baseDodgeDv + adjustedMobilityPenalty + tempDodgeDv + relicDodgeDv;
	knowingIsHalfTheBattleDv = Math.round((myCharacter['attributes']['intelligence'] + myCharacter['skills']['athletics']) / 2) + convertToEpic(myCharacter['epicAttributes']['epicIntelligence']) + adjustedMobilityPenalty + tempDodgeDv + relicDodgeDv;
	lightningReflexesDv = Math.round((myCharacter['attributes']['wits'] + myCharacter['skills']['athletics']) / 2) + convertToEpic(myCharacter['epicAttributes']['epicWits']) + adjustedMobilityPenalty + tempDodgeDv + relicDodgeDv;
	evasiveActionDv = Math.round((myCharacter['attributes']['wits'] + myCharacter['skills']['athletics']) / 2) + convertToEpic(myCharacter['epicAttributes']['epicWits']) + adjustedMobilityPenalty + tempDodgeDv + relicDodgeDv;
	doNotWantDv = Math.round((myCharacter['attributes']['appearance'] + myCharacter['skills']['athletics']) / 2) + convertToEpic(myCharacter['epicAttributes']['epicAppearance']) + adjustedMobilityPenalty + tempDodgeDv + relicDodgeDv;

	parryString = "";
	for(var attackName in myCharacter['attacks']) {
		thisParryAttribute = 0;
		thisParryEpic = 0;
		switch(myCharacter['attacks'][attackName]['attackAttribute']){
			case 'strength':
			thisParryAttribute = parseInt(myCharacter['attributes']['strength']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicStrength'])));
			break;
			case 'dexterity':
			thisParryAttribute = parseInt(myCharacter['attributes']['dexterity']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicDexterity'])));
			break;
			case 'stamina':
			thisParryAttribute = parseInt(myCharacter['attributes']['stamina']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicStamina'])));
			break;
			case 'charisma':
			thisParryAttribute = parseInt(myCharacter['attributes']['charisma']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicCharisma'])));
			break;
			case 'manipulation':
			thisParryAttribute = parseInt(myCharacter['attributes']['manipulation']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicManipulation'])));
			break;
			case 'appearance':
			thisParryAttribute = parseInt(myCharacter['attributes']['appearance']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicAppearance'])));
			break;
			case 'perception':
			thisParryAttribute = parseInt(myCharacter['attributes']['perception']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicPerception'])));
			break;
			case 'intelligence':
			thisParryAttribute = parseInt(myCharacter['attributes']['intelligence']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicIntelligence'])));
			break;
			case 'wits':
			thisParryAttribute = parseInt(myCharacter['attributes']['wits']);
			thisParryEpic = parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicWits'])));
			break;
		}
		thisParrySkill = 0;
		switch(myCharacter['attacks'][attackName]['attackAttribute']){
			case 'academics':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['academics']));
			break;
			case 'animalken':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['animalken']));
			break;
			case 'art':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['art']));
			break;
			case 'athletics':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['athletics']));
			break;
			case 'awareness':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['awareness']));
			break;
			case 'brawl':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['brawl']));
			break;
			case 'command':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['command']));
			break;
			case 'control':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['control']));
			break;
			case 'craft':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['craft']));
			break;
			case 'empathy':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['empathy']));
			break;
			case 'fortitude':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['fortitude']));
			break;
			case 'integrity':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['integrity']));
			break;
			case 'investigation':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['investigation']));
			break;
			case 'larceny':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['larceny']));
			break;
			case 'marksmanship':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['marksmanship']));
			break;
			case 'medicine':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['medicine']));
			break;
			case 'melee':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['melee']));
			break;
			case 'occult':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['occult']));
			break;
			case 'politics':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['politics']));
			break;
			case 'presence':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['presence']));
			break;
			case 'science':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['science']));
			break;
			case 'stealth':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['stealth']));
			break;
			case 'survival':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['survival']));
			break;
			case 'thrown':
			thisParrySkill = parseInt(nanEqualsZero(myCharacter['skills']['thrown']));
			break;
		}
		thisParryBase = parseInt(myCharacter['attacks'][attackName]['parryBase']);
		tempParryDv = 0;
		for(var tempName in myCharacter['tempModifier']) {
			if(myCharacter['tempModifier'][tempName]['tempModifier'] == "ParryDv") {
				tempParryDv += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
			}
		}
		relicParryDv = 0;
		for(var relicName in myCharacter['relics']) {
			if(myCharacter['relics'][relicName]['enabled'] == true) {
				for(var bonusDice in myCharacter['relics'][relicName]['bonusDice']) {
					if(bonusDice == attackName + "Parry") {
						relicParryDv += convertToEffectiveNumberBoons(myCharacter['relics'][relicName]['bonusDice'][bonusDice]);
					}
				}
				for(var itemEn in myCharacter['relics'][relicName]['itemEnhancements']) {
					if(itemEn == attackName + "parryDv") {
						relicParryDv += convertToEpic(parseInt(myCharacter['relics'][relicName]['itemEnhancements'][itemEn]));
					}
				}
			}
		}
		adjustedParry = Math.round((thisParryAttribute + thisParrySkill) / 2) + thisParryEpic + thisParryBase + tempParryDv + relicParryDv;
		parryString += attackName + " Parry DV: <strong>" + adjustedParry + "</strong><br>";
		if(myCharacter['knacks']['epicStrength']['empoweredDeflection'] == true) {
			adjustedParry = Math.round((parseInt(myCharacter['attributes']['strength']) + thisParrySkill) / 2) + parseInt(nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicStrength']))) + thisParryBase + tempParryDv + relicParryDv;
			parryString += attackName + " Parry DV (Empowered Deflection): <strong>" + adjustedParry + "</strong><br>";
		}
	}

	baseBashingSoak = parseInt(myCharacter['attributes']['stamina']) + nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicStamina']));
	baseLethalSoak = Math.round(parseInt(myCharacter['attributes']['stamina']) / 2) + nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicStamina']));
	baseAggravatedSoak = parseInt(myCharacter['epicAttributes']['epicStamina']);

	armorBashingSoak = 0;
	armorLethalSoak = 0;
	armorAggravatedSoak = 0;
	for(var armorName in myCharacter['armors']) {
		if(myCharacter['armors'][armorName]['enabled'] == true) {
			armorBashingSoak = parseInt(myCharacter['armors'][armorName]['bSoak']);
			armorLethalSoak =	parseInt(myCharacter['armors'][armorName]['lSoak']);
			armorAggravatedSoak = parseInt(myCharacter['armors'][armorName]['aSoak']);
			if(myCharacter['armors'][armorName]['lethalAddAg'] == true) {
				armorAggravatedSoak += armorLethalSoak;
			}
		}
	}
	tempBashingSoak = 0;
	tempLethalSoak = 0;
	tempAggravatedSoak = 0;
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "soak") {
			tempBashingSoak += parseInt(convertToEffectiveNumberBoons(myCharacter['tempModifier'][tempName]['tempModifierLevel']));
			tempLethalSoak += parseInt(convertToEffectiveNumberBoons(myCharacter['tempModifier'][tempName]['tempModifierLevel']));
			tempAggravatedSoak += parseInt(convertToEffectiveNumberBoons(myCharacter['tempModifier'][tempName]['tempModifierLevel']));
		}
	}
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "blsoak") {
			tempBashingSoak += parseInt(convertToEffectiveNumberBoons(myCharacter['tempModifier'][tempName]['tempModifierLevel']));
			tempLethalSoak += parseInt(convertToEffectiveNumberBoons(myCharacter['tempModifier'][tempName]['tempModifierLevel']));
		}
	}
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "asoak") {
			tempAggravatedSoak += parseInt(convertToEffectiveNumberBoons(myCharacter['tempModifier'][tempName]['tempModifierLevel']));
		}
	}
	relicBashingSoak = 0;
	relicLethalSoak = 0;
	relicAggravatedSoak = 0;
	for(var relicName in myCharacter['relics']) {
		if(myCharacter['relics'][relicName]['enabled'] == true) {
			for(var bonusDice in myCharacter['relics'][relicName]['bonusDice']) {
				if(bonusDice == relicName + "Soak") {
					relicBashingSoak += convertToEffectiveNumberBoons(myCharacter['relics'][relicName]['bonusDice'][bonusDice]);
					relicLethalSoak += convertToEffectiveNumberBoons(myCharacter['relics'][relicName]['bonusDice'][bonusDice]);
					relicAggravatedSoak += convertToEffectiveNumberBoons(myCharacter['relics'][relicName]['bonusDice'][bonusDice]);
				}
			}
			for(var itemEn in myCharacter['relics'][relicName]['itemEnhancements']) {
				if(itemEn == relicName + "soak") {
					relicBashingSoak += convertToEpic(parseInt(myCharacter['relics'][relicName]['itemEnhancements'][itemEn]));
					relicLethalSoak += convertToEpic(parseInt(myCharacter['relics'][relicName]['itemEnhancements'][itemEn]));
					relicAggravatedSoak += convertToEpic(parseInt(myCharacter['relics'][relicName]['itemEnhancements'][itemEn]));
				}
			}
		}
	}

	adjustedBashingSoak = baseBashingSoak + armorBashingSoak + tempBashingSoak + relicBashingSoak;
	adjustedLethalSoak = baseLethalSoak + armorLethalSoak + tempLethalSoak + relicLethalSoak;
	adjustedAggravatedSoak = baseAggravatedSoak + armorAggravatedSoak + tempAggravatedSoak + relicAggravatedSoak;
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel2'] == true) {
		adjustedBashingSoak += 1;
		adjustedLethalSoak += 1;
		adjustedAggravatedSoak += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel4'] == true) {
		adjustedBashingSoak += 1;
		adjustedLethalSoak += 1;
		adjustedAggravatedSoak += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel5'] == true) {
		adjustedBashingSoak += 2;
		adjustedLethalSoak += 2;
		adjustedAggravatedSoak += 2;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel6'] == true) {
		adjustedBashingSoak += 1;
		adjustedLethalSoak += 1;
		adjustedAggravatedSoak += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel9'] == true) {
		adjustedBashingSoak += 4;
		adjustedLethalSoak += 4;
		adjustedAggravatedSoak += 4;
	}
	piercingBashingSoak = adjustedBashingSoak - Math.round(armorBashingSoak / 2);
	piercingLethalSoak = adjustedLethalSoak - Math.round(armorLethalSoak / 2);
	piercingAggravatedSoak = adjustedAggravatedSoak - Math.round(armorAggravatedSoak / 2);
	noArmorBashingSoak = adjustedBashingSoak - armorBashingSoak;
	noArmorLethalSoak = adjustedLethalSoak - armorLethalSoak;
	noArmorAggravatedSoak = adjustedAggravatedSoak - armorAggravatedSoak;

	baseZeroHealthLevels = 1;
	baseOneHealthLevels = 2;
	baseTwoHealthLevels = 2;
	baseFourHealthLevels = 1;
	baseIncapacitatedHealthLevels = 1;
	baseDeadHealthLevels = parseInt(myCharacter['coreTraits']['legend']) + parseInt(myCharacter['attributes']['stamina']) + parseInt(myCharacter['epicAttributes']['epicStamina']);
	if(myCharacter['knacks']['epicStamina']['trueGrit'] == true) {
		baseZeroHealthLevels = baseZeroHealthLevels * 2;
		baseOneHealthLevels = baseOneHealthLevels * 2;
		baseTwoHealthLevels = baseTwoHealthLevels * 2;
		baseFourHealthLevels = baseFourHealthLevels * 2;
	}
	adjustedZeroHealthLevels = baseZeroHealthLevels + convertToEpic(myCharacter['epicAttributes']['epicStamina']);
	adjustedOneHealthLevels = baseOneHealthLevels;
	adjustedTwoHealthLevels = baseTwoHealthLevels;
	adjustedFourHealthLevels = baseFourHealthLevels;
	adjustedIncapacitatedHealthLevels = baseIncapacitatedHealthLevels;
	adjustedDeadHealthLevels = baseDeadHealthLevels;
	if(adjustedDeadHealthLevels > 20) {
		adjustedDeadHealthLevels = 20;
	}
	if(myCharacter['knacks']['epicStamina']['trueGrit'] == true) {
		adjustedFourHealthLevels += parseInt(myCharacter['epicAttributes']['epicStamina']);
	}
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "healthLevels") {
			adjustedZeroHealthLevels += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
		}
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel1'] == true) {
		adjustedZeroHealthLevels += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel2'] == true) {
		adjustedZeroHealthLevels += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel5'] == true) {
		adjustedZeroHealthLevels += 2;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel9'] == true) {
		adjustedZeroHealthLevels += 4;
	}

	defensesString = "";
	defensesString += "Dodge DV: <strong>" + adjustedDodgeDv + "</strong><br>";
	if(myCharacter['knacks']['epicIntelligence']['knowingIsHalfTheBattle'] == true) {
		defensesString += "Dodge DV (Knowing Is Half the Battle): <strong>" + knowingIsHalfTheBattleDv + "</strong><br>";
	}
	if(myCharacter['knacks']['epicWits']['lightningReflexes'] == true) {
		defensesString += "Dodge DV (Lightning Reflexes): <strong>" + lightningReflexesDv + "</strong><br>";
	}
	if(myCharacter['knacks']['epicAppearance']['doNotWant'] == true) {
		defensesString += "Dodge DV (Do Not Want): <strong>" + doNotWantDv + "</strong><br>";
	}
	if(myCharacter['knacks']['epicWits']['evasiveAction'] == true) {
		defensesString += "Optional Dodge DV against Area of Effects: <strong>" + evasiveActionDv + "</strong><br>";
	}
	if(myCharacter['boons']['water']['commanderOfCurrents'] == true && myValidChannelsList['water'] == true) {
		defensesString += "Bonus Dodge DV while in water: <strong>+" + effectiveNumberWater + "</strong><br>";
	}
	if(myCharacter['boons']['frost']['wintersGrace'] == true && myValidChannelsList['frost'] == true) {
		defensesString += "Bonus Dodge DV while on ice/snow: <strong>+" + effectiveNumberFrost + "</strong><br>";
	}
	defensiveDoOverValue = Math.round(myCharacter['skills']['athletics'] / 2);
	if(myCharacter['knacks']['epicDexterity']['untouchableOpponent']) {
		defensiveDoOverValue += parseInt(myCharacter['epicAttributes']['epicDexterity']);
	}
	defensesString += "Defensive Do-Over can reflexively add +" + defensiveDoOverValue + " DV<br>";
	if(myCharacter['boons']['illusion']['shadowPartner'] == true && myValidChannelsList['illusion'] == true) {
		if(myCharacter['selfName'] == "Enoch") {
			defensesString += "Shadow Partner can reflexively add +" + parseInt(effectiveNumberIllusion + myCharacter['coreTraits']['legend']) + " DV<br>";
		} else {
			defensesString += "Shadow Partner can reflexively add +" + effectiveNumberIllusion + " DV<br>";
		}
	}
	if(myCharacter['boons']['prophecy']['defensiveForesight'] == true && myValidChannelsList['prophecy'] == true) {
		defensesString += "Defensive Foresight can reflexively add +" + effectiveNumberProphecy + " DV<br>";
	}
	defensesString += "<br>";
	defensesString += parryString;
	defensesString += "<br>";
	defensesString += "Bashing Soak: <strong>" + adjustedBashingSoak + "</strong> (vs Piercing: " + piercingBashingSoak + ", vs Armor-Ignoring: " + noArmorBashingSoak + ")<br>";
	defensesString += "Lethal Soak: <strong>" + adjustedLethalSoak + "</strong> (vs Piercing: " + piercingLethalSoak + ", vs Armor-Ignoring: " + noArmorLethalSoak + ")<br>";
	defensesString += "Aggravated Soak: <strong>" + adjustedAggravatedSoak + "</strong> (vs Piercing: " + piercingAggravatedSoak + ", vs Armor-Ignoring: " + noArmorAggravatedSoak + ")<br>";
	if(myCharacter['knacks']['epicAppearance']['rockHardAbs'] == true) {
		defensesString += "Rock Hard Abs/Chainmail Bikini can reflexively add +" + parseInt(myCharacter['epicAttributes']['epicAppearance']) + " Soak<br>";
	}
	if(myCharacter['knacks']['epicDexterity']['rollWithIt'] == true) {
		if(myCharacter['selfName'] == "Marcela") {
			defensesString += "Roll With It can reflexively add +" + parseInt(myCharacter['epicAttributes']['epicDexterity'] * 2) + " Soak<br>";
		} else {
			defensesString += "Roll With It can reflexively add +" + parseInt(myCharacter['epicAttributes']['epicDexterity']) + " Soak<br>";
		}
	}
	if(myCharacter['boons']['fire']['fireAffinity'] == true && myValidChannelsList['fire'] == true) {
		defensesString += "Fire Affinity automatically adds +" + (2 * effectiveNumberFire) + " Soak against fire-based damage<br>"
	}
	if(myCharacter['boons']['frost']['frostAffinity'] == true && myValidChannelsList['frost'] == true) {
		defensesString += "Frost Affinity automatically adds +" + (2 * effectiveNumberFrost) + " Soak against cold-based damage<br>"
	}
	if(myCharacter['boons']['thunder']['lightningAffinity'] == true && myValidChannelsList['thunder'] == true) {
		defensesString += "Lightning Affinity automatically adds +" + (2 * effectiveNumberThunder) + " Soak against electricity-based damage<br>"
	}
	if(myCharacter['selfName'] == "Arev" || myCharacter['selfName'] == "Cora" || myCharacter['selfName'] == "Shrimati") {
		if(myCharacter['relics']['Raven\'s Favor']['enabled'] == true) {
			defensesString += "Raven's Favor automatically adds +" + (2 * parseInt(myCharacter['coreTraits']['legend'])) + " Soak against cold-based damage<br>"
		}
	}

	defensesString += "<br>";
	defensesString += "-0 Health Levels: <strong>" + adjustedZeroHealthLevels + "</strong><br>";
	defensesString += "-1 Health Levels: <strong>" + adjustedOneHealthLevels + "</strong><br>";
	defensesString += "-2 Health Levels: <strong>" + adjustedTwoHealthLevels + "</strong><br>";
	defensesString += "-4 Health Levels: <strong>" + adjustedFourHealthLevels + "</strong><br>";
	defensesString += "Incapacitated Health Levels: <strong>" + adjustedIncapacitatedHealthLevels + "</strong><br>";
	defensesString += "Dead Health Levels: <strong>" + adjustedDeadHealthLevels + "</strong><br>";
	defensesString += "<br>";

	document.getElementById('defensesArea').innerHTML = defensesString;
}
// this populates the other derived traits in the Other Traits section
function writeOtherDerivedTraitsArea() {
	derivedTraitsString = "";

	baseMove = parseInt(myCharacter['attributes']['dexterity']) + nanEqualsZero(convertToEpic(myCharacter['epicAttributes']['epicDexterity']));

	tempMove = 0;
	tempDash = 0;
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "Move") {
			tempMove += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
		}
	}
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifier'] == "Dash") {
			tempDash += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
		}
	}

	adjustedMove = baseMove + tempMove + adjustedMobilityPenalty;
	if(myCharacter['boons']['sky']['skysGrace'] == true && myValidChannelsList['sky'] == true) {
		adjustedMove += parseInt(effectiveNumberSky);
	}
	adjustedDash = (adjustedMove * 2) + tempDash;

	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifierSource'] == "Lightning Sprinter") {
			adjustedDash = adjustedDash * 2;
			break;
		}
	}
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifierSource'] == "Fast as Thought") {
			adjustedDash = adjustedDash * 4;
			break;
		}
	}

	baseSwimmingMove = Math.round(adjustedMove / 2);
	if(myCharacter['boons']['water']['favorOfTheWaves'] == true && myValidChannelsList['water'] == true) {
		baseSwimmingMove = adjustedMove;
	}
	baseClimbingMove = Math.round(adjustedMove / 2);
	adjustedSwimmingMove = baseSwimmingMove;
	if(myCharacter['boons']['water']['commanderOfCurrents'] == true && myValidChannelsList['water'] == true) {
		adjustedSwimmingMove += effectiveNumberWater;
	}
	adjustedClimbingMove = baseClimbingMove;

	baseVerticalJump = parseInt(myCharacter['attributes']['strength']) + parseInt(myCharacter['skills']['athletics']) + convertToEpic(myCharacter['epicAttributes']['epicStrength']);
	if(myCharacter['knacks']['epicStrength']['holyBound'] == true) {
		baseVerticalJump = baseVerticalJump * 2;
	}
	adjustedVerticalJump = baseVerticalJump;
	if(myCharacter['boons']['sky']['skysGrace'] == true && myValidChannelsList['sky'] == true) {
		adjustedVerticalJump += parseInt(effectiveNumberSky);
	}
	adjustedHorizontalJump = adjustedVerticalJump * 2;

	derivedTraitsString += "Move: <strong>" + adjustedMove + " yards</strong><br>";
	derivedTraitsString += "Dash: <strong>" + adjustedDash + " yards</strong><br>";
	derivedTraitsString += "Swim: <strong>" + adjustedSwimmingMove + " yards</strong><br>";
	derivedTraitsString += "Climb: <strong>" + adjustedClimbingMove + " yards</strong>";
	if(myCharacter['knacks']['epicDexterity']['monkeyClimber'] == true || myCharacter['knacks']['epicDexterity']['spiderClimber'] == true || myCharacter['knacks']['epicDexterity']['perfectClimber'] == true) {
		derivedTraitsString += "***";
	}
	derivedTraitsString += "<br>";
	derivedTraitsString += "Vertical Jump: <strong>" + adjustedVerticalJump + " yards</strong><br>";
	derivedTraitsString += "Horizontal Jump: <strong>" + adjustedHorizontalJump + " yards</strong><br>";
	derivedTraitsString += "<br>";

	enduranceLimit = parseInt(myCharacter['attributes']['stamina']) + parseInt(myCharacter['skills']['fortitude']);
	sleepDepLimit = 1 + convertToEpic(myCharacter['epicAttributes']['epicStamina']);
	starvationLimit = Math.round(parseInt(parseInt(myCharacter['attributes']['stamina'])) + parseInt(parseInt(myCharacter['skills']['fortitude']))) + convertToEpic(myCharacter['epicAttributes']['epicStamina']);
	dehydrationLimit = 1 + convertToEpic(myCharacter['epicAttributes']['epicStamina']);
	breathHoldLimit = Math.round(parseInt(parseInt(myCharacter['attributes']['stamina'])) + parseInt(parseInt(myCharacter['skills']['fortitude']))) * convertToEpic(myCharacter['epicAttributes']['epicStamina']);
	if(myCharacter['knacks']['epicStrength']['hangOn'] == true) {
		enduranceLimit += parseInt(myCharacter['epicAttributes']['epicStrength']);
	}
	if(myCharacter['knacks']['epicStamina']['holyFortitude'] == true) {
		enduranceLimit = enduranceLimit * 2;
		sleepDepLimit = sleepDepLimit * 2;
		starvationLimit = starvationLimit * 2;
		dehydrationLimit = dehydrationLimit * 2;
	}
	if(myCharacter['knacks']['epicStamina']['divineFortitude'] == true) {
		enduranceLimit = enduranceLimit * 2;
		sleepDepLimit = sleepDepLimit * 2;
	}
	if(myCharacter['knacks']['epicStamina']['tirelessWorker'] == true) {
		enduranceLimit = enduranceLimit * 100000;
		sleepDepLimit = sleepDepLimit * 100000;
	}
	if(myCharacter['knacks']['epicStamina']['whalesBreath'] == true) {
		breathHoldLimit = breathHoldLimit * 3;
	}

	derivedTraitsString += "Endurance Threshold: <strong>" + enduranceLimit;
	if(myCharacter['epicAttributes']['epicStamina'] == 0) {
		derivedTraitsString += " Hours </strong><br>";
	} else {
		derivedTraitsString += " Days </strong><br>";
	}
	derivedTraitsString += "Sleep Deprivation Threshold: <strong>" + sleepDepLimit + " Days</strong><br>";
	derivedTraitsString += "Starvation Threshold: <strong>" + starvationLimit + " Days</strong><br>";
	derivedTraitsString += "Dehydration Threshold: <strong>" + dehydrationLimit + " Days</strong><br>";
	if(breathHoldLimit / 2 <= 60) {
		derivedTraitsString += "Breath Hold Threshold: <strong>" + breathHoldLimit * 6 + " Actions / " + Math.round(breathHoldLimit / 2) + " Minutes</strong><br>";
	} else {
		derivedTraitsString += "Breath Hold Threshold: <strong>" + breathHoldLimit * 6 + " Actions / " + Math.round(breathHoldLimit / 120) + " Hours</strong><br>";
	}
	derivedTraitsString += "<br>";

	basePerceptionDistance = parseInt(myCharacter['attributes']['perception']);
	for(var tempName in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempName]['tempModifierSource'] == "Dust Cloud" || myCharacter['tempModifier'][tempName]['tempModifierSource'] == "Shadow Shroud") {
			basePerceptionDistance = basePerceptionDistance + parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
			if(basePerceptionDistance <= 0) {
				basePerceptionDistance = 0;
			}
		}
	}
	switch(myCharacter['epicAttributes']['epicPerception']) {
		case 0:
		basePerceptionDistance = basePerceptionDistance * 1;
		break;
		case 1:
		basePerceptionDistance = basePerceptionDistance * 2;
		break;
		case 2:
		basePerceptionDistance = basePerceptionDistance * 4;
		break;
		case 3:
		basePerceptionDistance = basePerceptionDistance * 8;
		break;
		case 4:
		basePerceptionDistance = basePerceptionDistance * 10;
		break;
		case 5:
		basePerceptionDistance = basePerceptionDistance * 20;
		break;
		case 6:
		basePerceptionDistance = basePerceptionDistance * 50;
		break;
		case 7:
		basePerceptionDistance = basePerceptionDistance * 100;
		break;
		case 8:
		basePerceptionDistance = basePerceptionDistance * 500;
		break;
		case 9:
		basePerceptionDistance = basePerceptionDistance * 1000;
		break;
		case 10:
		basePerceptionDistance = basePerceptionDistance * 2000;
		break;
	}

	adjustedVisionDistance = basePerceptionDistance;
	adjustedHearingDistance = basePerceptionDistance;
	if(myCharacter['knacks']['epicPerception']['perfectPitch'] == true) {
		adjustedHearingDistance = adjustedHearingDistance * 2;
	}
	if(myCharacter['knacks']['epicPerception']['telescopicVision'] == true) {
		adjustedVisionDistance = adjustedVisionDistance * 2;
	}
	derivedTraitsString += "See the horizon at " + adjustedVisionDistance + " miles<br>";
	if(adjustedVisionDistance * 100 > 2000) {
		derivedTraitsString += "Recognize a person waving at " + Math.round((adjustedVisionDistance * 100) / 1760) + " miles<br>";
	} else {
		derivedTraitsString += "Recognize a person waving at " + adjustedVisionDistance * 100 + " yards<br>";
	}
	derivedTraitsString += "Read type at " + adjustedVisionDistance + " yards<br>";
	derivedTraitsString += "Hear a gunshot at " + Math.round(adjustedHearingDistance / 2) + " miles<br>";
	derivedTraitsString += "Hear normal conversation at " + adjustedHearingDistance * 2 + " yards<br>";
	derivedTraitsString += "Hear a person breathing at " + Math.round(adjustedHearingDistance / 2) + " yards<br>";
	derivedTraitsString += "<br>";

	thrownWeaponRange = 10;
	thrownHeavyRange = 1;
	switch(myCharacter['epicAttributes']['epicStrength']) {
		case 0:
		thrownWeaponRange = thrownWeaponRange * 1;
		thrownHeavyRange = thrownHeavyRange + 0;
		break;
		case 1:
		thrownWeaponRange = thrownWeaponRange * 2;
		thrownHeavyRange = thrownHeavyRange + 2;
		break;
		case 2:
		thrownWeaponRange = thrownWeaponRange * 4;
		thrownHeavyRange = thrownHeavyRange + 4;
		break;
		case 3:
		thrownWeaponRange = thrownWeaponRange * 8;
		thrownHeavyRange = thrownHeavyRange + 8;
		break;
		case 4:
		thrownWeaponRange = thrownWeaponRange * 10;
		thrownHeavyRange = thrownHeavyRange + 10;
		break;
		case 5:
		thrownWeaponRange = thrownWeaponRange * 20;
		thrownHeavyRange = thrownHeavyRange + 20;
		break;
		case 6:
		thrownWeaponRange = thrownWeaponRange * 50;
		thrownHeavyRange = thrownHeavyRange + 50;
		break;
		case 7:
		thrownWeaponRange = thrownWeaponRange * 100;
		thrownHeavyRange = thrownHeavyRange + 100;
		break;
		case 8:
		thrownWeaponRange = thrownWeaponRange * 500;
		thrownHeavyRange = thrownHeavyRange + 500;
		break;
		case 9:
		thrownWeaponRange = thrownWeaponRange * 1000;
		thrownHeavyRange = thrownHeavyRange + 1000;
		break;
		case 10:
		thrownWeaponRange = thrownWeaponRange * 2000;
		thrownHeavyRange = thrownHeavyRange + 2000;
		break;
	}
	if(myCharacter['knacks']['epicStrength']['hurlToTheHorizon'] == true) {
		thrownWeaponRange = thrownWeaponRange * 2;
		thrownHeavyRange = thrownHeavyRange * 2;
	}
	if(myCharacter['knacks']['epicStrength']['mightyHeave'] == true) {
		thrownWeaponRange = thrownWeaponRange * 2;
		thrownHeavyRange = thrownHeavyRange * 2;
	}
	derivedTraitsString += "Throw weapons and small objects " + thrownWeaponRange + " yards.<br>";
	derivedTraitsString += "Throw heavy stuff " + thrownHeavyRange + " + (Feat of Strength successes) yards.<br>";

	document.getElementById('otherDerivedTraitsArea').innerHTML = derivedTraitsString;
}
// this determines what powers we can Channel
function getValidChannels() {
	for(var relicName in myCharacter['relics']) {
		if(myCharacter['relics'][relicName]['enabled'] == true) {
			for(var channelName in myCharacter['relics'][relicName]['channels']) {
				myValidChannelsList[channelName] = true;
			}
		}
	}
}



// this determines actual dice pools and all derived traits
function calculate() {
	getTempBonuses();
	getNumberBoonsValues();
	getRelicBonuses();
	getFatebondBonuses();
	getCoreTraitsValues();
	getAttributesValues();
	getSkillsValues();
	getVirtuesValues();
	getBoonsDiceValues();
	getPresetRolls();
	getAttackBonuses();
}
// this gets the bonuses from Temporary
function getTempBonuses() {
	tempIndex = myCharacter.tempModifier;
	for(var tempMod in tempIndex) {
		tempModLevel = parseInt(tempIndex[tempMod]['tempModifierLevel']);
		tempModType = tempIndex[tempMod]['tempModifierType'];
		tempModMod = lowercaseFirstLetter(tempIndex[tempMod]['tempModifier']);
		if(tempModType == 'bonusDice') {
			myTempDice[tempModMod] = nanEqualsZero(myTempDice[tempModMod]) + tempModLevel;
		}
		if(tempModType == 'bonusSuccesses') {
			myTempSucc[tempModMod] = nanEqualsZero(myTempSucc[tempModMod]) + tempModLevel;
		}
		if(tempModType == 'bonusBoons') {
			myTempBoons[tempModMod] = nanEqualsZero(myTempBoons[tempModMod]) + tempModLevel;
		}
	}
}
// this extracts the unmodified #Boons from the lists of Boons on the main object
function getNumberBoonsValues() {
	boonsIndex = myCharacter.boons;

	numberAnimal = 0;
	for(var prop in boonsIndex['animal']) {
		if(boonsIndex['animal'][prop] == true) {
			numberAnimal++;
		}
	}
	numberChaos = 0;
	for(var prop in boonsIndex['chaos']) {
		if(boonsIndex['chaos'][prop] == true) {
			numberChaos++;
		}
	}
	numberCreation = 0;
	for(var prop in boonsIndex['creation']) {
		if(boonsIndex['creation'][prop] == true) {
			numberCreation++;
		}
	}
	numberDarkness = 0;
	for(var prop in boonsIndex['darkness']) {
		if(boonsIndex['darkness'][prop] == true) {
			numberDarkness++;
		}
	}
	numberDeath = 0;
	for(var prop in boonsIndex['death']) {
		if(boonsIndex['death'][prop] == true) {
			numberDeath++;
		}
	}
	numberEarth = 0;
	for(var prop in boonsIndex['earth']) {
		if(boonsIndex['earth'][prop] == true) {
			numberEarth++;
		}
	}
	numberFertility = 0;
	for(var prop in boonsIndex['fertility']) {
		if(boonsIndex['fertility'][prop] == true) {
			numberFertility++;
		}
	}
	numberFire = 0;
	for(var prop in boonsIndex['fire']) {
		if(boonsIndex['fire'][prop] == true) {
			numberFire++;
		}
	}
	numberFertility = 0;
	for(var prop in boonsIndex['fertility']) {
		if(boonsIndex['fertility'][prop] == true) {
			numberFertility++;
		}
	}
	numberFrost = 0;
	for(var prop in boonsIndex['frost']) {
		if(boonsIndex['frost'][prop] == true) {
			numberFrost++;
		}
	}
	numberGuardian = 0;
	for(var prop in boonsIndex['guardian']) {
		if(boonsIndex['guardian'][prop] == true) {
			numberGuardian++;
		}
	}
	numberHealth = 0;
	for(var prop in boonsIndex['health']) {
		if(boonsIndex['health'][prop] == true) {
			numberHealth++;
		}
	}
	numberIllusion = 0;
	for(var prop in boonsIndex['illusion']) {
		if(boonsIndex['illusion'][prop] == true) {
			numberIllusion++;
		}
	}
	numberJustice = 0;
	for(var prop in boonsIndex['justice']) {
		if(boonsIndex['justice'][prop] == true) {
			numberJustice++;
		}
	}
	numberMagic = 0;
	for(var prop in boonsIndex['magic']) {
		if(boonsIndex['magic'][prop] == true) {
			numberMagic++;
		}
	}
	numberMoon = 0;
	for(var prop in boonsIndex['moon']) {
		if(boonsIndex['moon'][prop] == true) {
			numberMoon++;
		}
	}
	numberMystery = 0;
	for(var prop in boonsIndex['mystery']) {
		if(boonsIndex['mystery'][prop] == true) {
			numberMystery++;
		}
	}
	numberProphecy = 0;
	for(var prop in boonsIndex['prophecy']) {
		if(boonsIndex['prophecy'][prop] == true) {
			numberProphecy++;
		}
	}
	numberPsychopomp = 0;
	for(var prop in boonsIndex['psychopomp']) {
		if(boonsIndex['psychopomp'][prop] == true) {
			numberPsychopomp++;
		}
	}
	numberSky = 0;
	for(var prop in boonsIndex['sky']) {
		if(boonsIndex['sky'][prop] == true) {
			numberSky++;
		}
	}
	numberStar = 0;
	for(var prop in boonsIndex['star']) {
		if(boonsIndex['star'][prop] == true) {
			numberStar++;
		}
	}
	numberSun = 0;
	for(var prop in boonsIndex['sun']) {
		if(boonsIndex['sun'][prop] == true) {
			numberSun++;
		}
	}
	numberThunder = 0;
	for(var prop in boonsIndex['thunder']) {
		if(boonsIndex['thunder'][prop] == true) {
			numberThunder++;
		}
	}
	numberWar = 0;
	for(var prop in boonsIndex['war']) {
		if(boonsIndex['war'][prop] == true) {
			numberWar++;
		}
	}
	numberWater = 0;
	for(var prop in boonsIndex['water']) {
		if(boonsIndex['water'][prop] == true) {
			numberWater++;
		}
	}

	if(genExceptionsMasterList['giantAmongGods'][myCharacter['selfName']]) {
		giantAmongGodsDice = 0;
		if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel8'] == true) {
			giantAmongGodsDice += 5;
		}
		if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel9'] == true) {
			giantAmongGodsDice += 4;
		}
		giantAmongGods = genExceptionsMasterList['giantAmongGods'][myCharacter['selfName']]['value1'];
		switch (giantAmongGods) {
			case "animal":
			numberAnimal += giantAmongGodsDice;
			break;
			case "chaos":
			numberChaos += giantAmongGodsDice;
			break;
			case "creation":
			numberCreation += giantAmongGodsDice;
			break;
			case "darkness":
			numberDarkness += giantAmongGodsDice;
			break;
			case "death":
			numberDeath += giantAmongGodsDice;
			break;
			case "earth":
			numberEarth += giantAmongGodsDice;
			break;
			case "fertility":
			numberFertility += giantAmongGodsDice;
			break;
			case "fire":
			numberFire += giantAmongGodsDice;
			break;
			case "frost":
			numberFrost += giantAmongGodsDice;
			break;
			case "guardian":
			numberGuardian += giantAmongGodsDice;
			break;
			case "health":
			numberHealth += giantAmongGodsDice;
			break;
			case "illusion":
			numberIllusion += giantAmongGodsDice;
			break;
			case "justice":
			numberJustice += giantAmongGodsDice;
			break;
			case "magic":
			numberMagic += giantAmongGodsDice;
			break;
			case "moon":
			numberMoon += giantAmongGodsDice;
			break;
			case "mystery":
			numberMystery += giantAmongGodsDice;
			break;
			case "prophecy":
			numberProphecy += giantAmongGodsDice;
			break;
			case "psychopomp":
			numberPsychopomp += giantAmongGodsDice;
			break;
			case "sky":
			numberSky += giantAmongGodsDice;
			break;
			case "star":
			numberStar += giantAmongGodsDice;
			break;
			case "sun":
			numberSun += giantAmongGodsDice;
			break;
			case "thunder":
			numberThunder += giantAmongGodsDice;
			break;
			case "war":
			numberWar += giantAmongGodsDice;
			break;
			case "water":
			numberAnimal += giantAmongGodsDice;
			break;
		}
	}

}
// this gets the bonuses from Relics and determines the modified #Boons for all other Relic modifiers
function getRelicBonuses() {
	relicsIndex = myCharacter.relics;
	for(var relicName in relicsIndex) {
		if(relicsIndex[relicName]['enabled'] == true) {
			for(var bonusB in relicsIndex[relicName]['relicBoons']) {
				myRelicBonusB.push(bonusB);
				myRelicBonusB2.push(relicsIndex[relicName]['relicBoons'][bonusB]);
			}
		}
	}
	for(i = 0; i < myRelicBonusB2.length; i++) {
		switch(myRelicBonusB2[i]) {
			case 'numberAnimal':
			myRelicBonusB2[i] = nanEqualsZero(numberAnimal);
			break;
			case 'numberChaos':
			myRelicBonusB2[i] = nanEqualsZero(numberChaos);
			break;
			case 'numberCreation':
			myRelicBonusB2[i] = nanEqualsZero(numberCreation);
			break;
			case 'numberDarkness':
			myRelicBonusB2[i] = nanEqualsZero(numberDarkness);
			break;
			case 'numberDeath':
			myRelicBonusB2[i] = nanEqualsZero(numberDeath);
			break;
			case 'numberEarth':
			myRelicBonusB2[i] = nanEqualsZero(numberEarth);
			break;
			case 'numberFertility':
			myRelicBonusB2[i] = nanEqualsZero(numberFertility);
			break;
			case 'numberFire':
			myRelicBonusB2[i] = nanEqualsZero(numberFire);
			break;
			case 'numberFrost':
			myRelicBonusB2[i] = nanEqualsZero(numberFrost);
			break;
			case 'numberGuardian':
			myRelicBonusB2[i] = nanEqualsZero(numberGuardian);
			break;
			case 'numberHealth':
			myRelicBonusB2[i] = nanEqualsZero(numberHealth);
			break;
			case 'numberIllusion':
			myRelicBonusB2[i] = nanEqualsZero(numberIllusion);
			break;
			case 'numberJustice':
			myRelicBonusB2[i] = nanEqualsZero(numberJustice);
			break;
			case 'numberMagic':
			myRelicBonusB2[i] = nanEqualsZero(numberMagic);
			break;
			case 'numberMoon':
			myRelicBonusB2[i] = nanEqualsZero(numberMoon);
			break;
			case 'numberMystery':
			myRelicBonusB2[i] = nanEqualsZero(numberMystery);
			break;
			case 'numberProphecy':
			myRelicBonusB2[i] = nanEqualsZero(numberProphecy);
			break;
			case 'numberPsychopomp':
			myRelicBonusB2[i] = nanEqualsZero(numberPsychopomp);
			break;
			case 'numberSky':
			myRelicBonusB2[i] = nanEqualsZero(numberSky);
			break;
			case 'numberStar':
			myRelicBonusB2[i] = nanEqualsZero(numberStar);
			break;
			case 'numberSun':
			myRelicBonusB2[i] = nanEqualsZero(numberSun);
			break;
			case 'numberThunder':
			myRelicBonusB2[i] = nanEqualsZero(numberThunder);
			break;
			case 'numberWar':
			myRelicBonusB2[i] = nanEqualsZero(numberWar);
			break;
			case 'numberWater':
			myRelicBonusB2[i] = nanEqualsZero(numberWater);
			break;
			case 'numberLegend':
			myRelicBonusB2[i] = myCharacter['coreTraits']['legend'];
			break;
		}
	}
	for(i = 0; i < myRelicBonusB.length; i++) {
		var relicBonusBoonsToLoad1 = myRelicBonusB[i];
		var relicBonusBoonsToLoad2 = myRelicBonusB2[i];
		tempRelicBonusBoons = nanEqualsZero(myRelicBonusBoons[relicBonusBoonsToLoad1]) + relicBonusBoonsToLoad2;
		myRelicBonusBoons[relicBonusBoonsToLoad1] = tempRelicBonusBoons;
	}
	effectiveNumberAnimal = numberAnimal + nanEqualsZero(myRelicBonusBoons.numberAnimal) + nanEqualsZero(myTempBoons.animal);
	effectiveNumberChaos = numberChaos + nanEqualsZero(myRelicBonusBoons.numberChaos) + nanEqualsZero(myTempBoons.chaos);
	effectiveNumberCreation  = numberCreation + nanEqualsZero(myRelicBonusBoons.numberCreation) + nanEqualsZero(myTempBoons.creation);
	effectiveNumberDarkness = numberDarkness + nanEqualsZero(myRelicBonusBoons.numberDarkness) + nanEqualsZero(myTempBoons.darkness);
	effectiveNumberDeath = numberDeath + nanEqualsZero(myRelicBonusBoons.numberDeath) + nanEqualsZero(myTempBoons.death);
	effectiveNumberEarth = numberEarth + nanEqualsZero(myRelicBonusBoons.numberEarth) + nanEqualsZero(myTempBoons.earth);
	effectiveNumberFertility = numberFertility + nanEqualsZero(myRelicBonusBoons.numberFertility) + nanEqualsZero(myTempBoons.fertility);
	effectiveNumberFire = numberFire + nanEqualsZero(myRelicBonusBoons.numberFire) + nanEqualsZero(myTempBoons.fire);
	effectiveNumberFrost = numberFrost + nanEqualsZero(myRelicBonusBoons.numberFrost) + nanEqualsZero(myTempBoons.frost);
	effectiveNumberGuardian = numberGuardian + nanEqualsZero(myRelicBonusBoons.numberGuardian) + nanEqualsZero(myTempBoons.guardian);
	effectiveNumberHealth = numberHealth + nanEqualsZero(myRelicBonusBoons.numberHealth) + nanEqualsZero(myTempBoons.health);
	effectiveNumberIllusion = numberIllusion + nanEqualsZero(myRelicBonusBoons.numberIllusion) + nanEqualsZero(myTempBoons.illusion);
	effectiveNumberJustice = numberJustice + nanEqualsZero(myRelicBonusBoons.numberJustice) + nanEqualsZero(myTempBoons.justice);
	effectiveNumberMagic = numberMagic + nanEqualsZero(myRelicBonusBoons.numberMagic) + nanEqualsZero(myTempBoons.magic);
	effectiveNumberMoon = numberMoon + nanEqualsZero(myRelicBonusBoons.numberMoon) + nanEqualsZero(myTempBoons.moon);
	effectiveNumberMystery = numberMystery + nanEqualsZero(myRelicBonusBoons.numberMystery) + nanEqualsZero(myTempBoons.mystery);
	effectiveNumberProphecy = numberProphecy + nanEqualsZero(myRelicBonusBoons.numberProphecy) + nanEqualsZero(myTempBoons.prophecy);
	effectiveNumberPsychopomp = numberPsychopomp + nanEqualsZero(myRelicBonusBoons.numberPsychopomp) + nanEqualsZero(myTempBoons.psychopomp);
	effectiveNumberSky = numberSky + nanEqualsZero(myRelicBonusBoons.numberSky) + nanEqualsZero(myTempBoons.sky);
	effectiveNumberStar = numberStar + nanEqualsZero(myRelicBonusBoons.numberStar) + nanEqualsZero(myTempBoons.star);
	effectiveNumberSun = numberSun + nanEqualsZero(myRelicBonusBoons.numberSun) + nanEqualsZero(myTempBoons.sun);
	effectiveNumberThunder = numberThunder + nanEqualsZero(myRelicBonusBoons.numberThunder) + nanEqualsZero(myTempBoons.thunder);
	effectiveNumberWar = numberWar + nanEqualsZero(myRelicBonusBoons.numberWar) + nanEqualsZero(myTempBoons.war);
	effectiveNumberWater = numberWater + nanEqualsZero(myRelicBonusBoons.numberWater) + nanEqualsZero(myTempBoons.water);

	for(var relicName in relicsIndex) {
		if(relicsIndex[relicName]['enabled'] == true) {
			for(var bonusD in relicsIndex[relicName]['bonusDice']) {
				bonusD2 = relicsIndex[relicName]['bonusDice'][bonusD];
				bonusD2 = bonusD2.replace("#", "");
				bonusD2 = capitalizeFirstLetter(bonusD2);
				bonusD2 = "number" + bonusD2;
				myRelicBonusD.push(bonusD);
				myRelicBonusD2.push(bonusD2);
			}
		}
	}
	for(i = 0; i < myRelicBonusD2.length; i++) {
		switch(myRelicBonusD2[i]) {
			case 'numberAnimal':
			myRelicBonusD2[i] = effectiveNumberAnimal;
			break;
			case 'numberChaos':
			myRelicBonusD2[i] = effectiveNumberChaos;
			break;
			case 'numberCreation':
			myRelicBonusD2[i] = effectiveNumberCreation;
			break;
			case 'numberDarkness':
			myRelicBonusD2[i] = effectiveNumberDarkness;
			break;
			case 'numberDeath':
			myRelicBonusD2[i] = effectiveNumberDeath;
			break;
			case 'numberEarth':
			myRelicBonusD2[i] = effectiveNumberEarth;
			break;
			case 'numberFertility':
			myRelicBonusD2[i] = effectiveNumberFertility;
			break;
			case 'numberFire':
			myRelicBonusD2[i] = effectiveNumberFire;
			break;
			case 'numberFrost':
			myRelicBonusD2[i] = effectiveNumerFrost;
			break;
			case 'numberGuardian':
			myRelicBonusD2[i] = effectiveNumberGuardian;
			break;
			case 'numberHealth':
			myRelicBonusD2[i] = effectiveNumberHealth;
			break;
			case 'numberIllusion':
			myRelicBonusD2[i] = effectiveNumberIllusion;
			break;
			case 'numberJustice':
			myRelicBonusD2[i] = effectiveNumberJustice;
			break;
			case 'numberMagic':
			myRelicBonusD2[i] = effectiveNumberMagic;
			break;
			case 'numberMoon':
			myRelicBonusD2[i] = effectiveNumberMoon;
			break;
			case 'numberMystery':
			myRelicBonusD2[i] = effectiveNumberMystery;
			break;
			case 'numberProphecy':
			myRelicBonusD2[i] = effectiveNumberProphecy;
			break;
			case 'numberPsychopomp':
			myRelicBonusD2[i] = effectiveNumberPsychopomp;
			break;
			case 'numberSky':
			myRelicBonusD2[i] = effectiveNumberSky;
			break;
			case 'numberStar':
			myRelicBonusD2[i] = effectiveNumberStar;
			break;
			case 'numberSun':
			myRelicBonusD2[i] = effectiveNumberSun;
			break;
			case 'numberThunder':
			myRelicBonusD2[i] = effectiveNumberThunder;
			break;
			case 'numberWar':
			myRelicBonusD2[i] = effectiveNumberWar;
			break;
			case 'numberWater':
			myRelicBonusD2[i] = effectiveNumberWater;
			break;
			case 'numberLegend':
			myRelicBonusD2[i] = myCharacter['coreTraits']['legend'];
			break;
		}
	}
	for(i = 0; i < myRelicBonusD.length; i++) {
		var relicBonusDiceToLoad1 = myRelicBonusD[i];
		var relicBonusDiceToLoad2 = myRelicBonusD2[i];
		tempRelicBonusDice = nanEqualsZero(myRelicBonusDice[relicBonusDiceToLoad1]) + relicBonusDiceToLoad2;
		myRelicBonusDice[relicBonusDiceToLoad1] = tempRelicBonusDice;
	}



	for(var relicName in relicsIndex) {
		if(relicsIndex[relicName]['enabled'] == true) {
			for(var itemE in relicsIndex[relicName]['itemEnhancements']) {

			}
		}
	}




}
// this gets the bonuses from Fatebonds
function getFatebondBonuses() {
	fatebondsIndex = myCharacter.fatebonds;
	for(var fatebond in fatebondsIndex) {
		fatebondBonus = lowercaseFirstLetter(fatebondsIndex[fatebond]['fatebondBonus']);
		fatebondPenalty = lowercaseFirstLetter(fatebondsIndex[fatebond]['fatebondPenalty']);
		fatebondLevel = parseInt(fatebondsIndex[fatebond]['fatebondLevel']);
		fatebondLevelMinus = fatebondLevel * -1;
		fatebondLevelTemp1 = nanEqualsZero(myFatebonds[fatebondBonus]);
		fatebondLevelTemp2 = nanEqualsZero(myFatebonds[fatebondPenalty]);
		myFatebonds[fatebondBonus] = fatebondLimitTen(fatebondLevel + fatebondLevelTemp1);
		myFatebonds[fatebondPenalty] = fatebondLimitTen(fatebondLevelMinus + fatebondLevelTemp2);
	}
	if(myCharacter['characterPantheon'] == "Elohim" && myCharacter['boons']['psp']['pspLevel5'] == true) {
		myFatebonds['earth'] = myFatebonds['earth'] + myCharacter['virtues']['piety'];
		myFatebonds['fertility'] = myFatebonds['fertility'] + myCharacter['virtues']['piety'];
		myFatebonds['fire'] = myFatebonds['fire'] + myCharacter['virtues']['piety'];
		myFatebonds['frost'] = myFatebonds['frost'] + myCharacter['virtues']['piety'];
		myFatebonds['sky'] = myFatebonds['sky'] + myCharacter['virtues']['piety'];
		myFatebonds['thunder'] = myFatebonds['thunder'] + myCharacter['virtues']['piety'];
		myFatebonds['water'] = myFatebonds['water'] + myCharacter['virtues']['piety'];
	}
	if(myCharacter['characterPantheon'] == "Elohim" && myCharacter['boons']['psp']['pspLevel6'] == true) {
		myFatebonds['animal'] = myFatebonds['animal'] + myCharacter['virtues']['piety'];
		myFatebonds['health'] = myFatebonds['health'] + myCharacter['virtues']['piety'];
		myFatebonds['death'] = myFatebonds['death'] + myCharacter['virtues']['piety'];
	}
}
// this extracts Core Traits variables from the main object and modifies them
function getCoreTraitsValues() {
	coreTraitsIndex = myCharacter.coreTraits;

	effectiveLegendDice = coreTraitsIndex.legend + nanEqualsZero(myRelicBonusDice.legend) + nanEqualsZero(myTempDice.legend);
	effectiveWillpowerDice = coreTraitsIndex.willpower + nanEqualsZero(myRelicBonusDice.willpower) + nanEqualsZero(myTempDice.willpower);

	effectiveLegendSucc = nanEqualsZero(myTempSucc.legend);
	effectiveLegendSucc = nanEqualsZero(myTempSucc.willpower);
}
// this extracts Attributes variables from the main object and modifies them
function getAttributesValues() {
	attributesIndex = myCharacter.attributes;
	epicAttributesIndex = myCharacter.epicAttributes;

	effectiveStrengthDice = attributesIndex.strength + nanEqualsZero(myRelicBonusDice.strength) + nanEqualsZero(myFatebonds.strength) + nanEqualsZero(myTempDice.strength);
	effectiveDexterityDice = attributesIndex.dexterity + nanEqualsZero(myRelicBonusDice.dexterity) + nanEqualsZero(myFatebonds.dexterity) + nanEqualsZero(myTempDice.dexterity);
	effectiveStaminaDice = attributesIndex.stamina + nanEqualsZero(myRelicBonusDice.stamina) + nanEqualsZero(myFatebonds.stamina) + nanEqualsZero(myTempDice.stamina);
	effectiveCharismaDice = attributesIndex.charisma + nanEqualsZero(myRelicBonusDice.charisma) + nanEqualsZero(myFatebonds.charisma) + nanEqualsZero(myTempDice.charisma);
	effectiveManipulationDice = attributesIndex.manipulation + nanEqualsZero(myRelicBonusDice.manipulation) + nanEqualsZero(myFatebonds.manipulation) + nanEqualsZero(myTempDice.manipulation);
	effectiveAppearanceDice = attributesIndex.appearance + nanEqualsZero(myRelicBonusDice.appearance) + nanEqualsZero(myFatebonds.appearance) + nanEqualsZero(myTempDice.appearance);
	effectivePerceptionDice = attributesIndex.perception + nanEqualsZero(myRelicBonusDice.perception) + nanEqualsZero(myFatebonds.perception) + nanEqualsZero(myTempDice.perception);
	effectiveIntelligenceDice = attributesIndex.intelligence + nanEqualsZero(myRelicBonusDice.intelligence) + nanEqualsZero(myFatebonds.intelligence) + nanEqualsZero(myTempDice.intelligence);
	effectiveWitsDice = attributesIndex.wits + nanEqualsZero(myRelicBonusDice.wits) + nanEqualsZero(myFatebonds.wits) + nanEqualsZero(myTempDice.wits);

	giantAmongMenDice = 0;
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel2'] == true) {
		effectiveStrengthDice += 1;
		effectiveStaminaDice += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel4'] == true) {
		effectiveStrengthDice += 1;
		effectiveStaminaDice += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel5'] == true) {
		effectiveStrengthDice += 2;
		effectiveStaminaDice += 2;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel6'] == true) {
		effectiveStrengthDice += 1;
		effectiveStaminaDice += 1;
		giantAmongMenDice += 5;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel9'] == true) {
		effectiveStrengthDice += 4;
		effectiveStaminaDice += 4;
		giantAmongMenDice += 4;
	}
	if(genExceptionsMasterList['giantAmongMen'][myCharacter['selfName']]) {
		giantAmongMen = genExceptionsMasterList['giantAmongMen'][myCharacter['selfName']]['value1'];
		switch (giantAmongMen) {
			case "charisma":
			effectiveCharismaDice += giantAmongMenDice;
			break;
			case "manipulation":
			effectiveManipulationDice += giantAmongMenDice;
			break;
			case "appearance":
			effectiveAppearanceDice += giantAmongMenDice;
			break;
			case "perception":
			effectivePerceptionDice += giantAmongMenDice;
			break;
			case "intelligence":
			effectiveIntelligenceDice += giantAmongMenDice;
			break;
			case "wits":
			effectiveWitsDice += giantAmongMenDice;
			break;
		}
	}

	effectiveStrengthSucc = convertToEpic(epicAttributesIndex.epicStrength) + nanEqualsZero(myTempSucc.strength);
	effectiveDexteritySucc = convertToEpic(epicAttributesIndex.epicDexterity) + nanEqualsZero(myTempSucc.dexterity);
	effectiveStaminaSucc = convertToEpic(epicAttributesIndex.epicStamina) + nanEqualsZero(myTempSucc.stamina);
	effectiveCharismaSucc = convertToEpic(epicAttributesIndex.epicCharisma) + nanEqualsZero(myTempSucc.charisma);
	effectiveManipulationSucc = convertToEpic(epicAttributesIndex.epicManipulation) + nanEqualsZero(myTempSucc.manipulation);
	effectiveAppearanceSucc = convertToEpic(epicAttributesIndex.epicAppearance) + nanEqualsZero(myTempSucc.appearance);
	effectivePerceptionSucc = convertToEpic(epicAttributesIndex.epicPerception) + nanEqualsZero(myTempSucc.perception);
	effectiveIntelligenceSucc = convertToEpic(epicAttributesIndex.epicIntelligence) + nanEqualsZero(myTempSucc.intelligence);
	effectiveWitsSucc = convertToEpic(epicAttributesIndex.epicWits) + nanEqualsZero(myTempSucc.wits);
}
// this extracts Skills variables from the main object and modifies them
function getSkillsValues() {
	skillsIndex = myCharacter.skills;

	effectiveAcademicsDice = skillsIndex.academics + nanEqualsZero(myRelicBonusDice.academics) + nanEqualsZero(myFatebonds.academics) + nanEqualsZero(myTempDice.academics);
	effectiveAnimalkenDice = skillsIndex.animalken + nanEqualsZero(myRelicBonusDice.animalken) + nanEqualsZero(myFatebonds.animalken) + nanEqualsZero(myTempDice.animalken);
	effectiveArtDice = skillsIndex.art + nanEqualsZero(myRelicBonusDice.art) + nanEqualsZero(myFatebonds.art) + nanEqualsZero(myTempDice.art);
	effectiveAthleticsDice = skillsIndex.athletics + nanEqualsZero(myRelicBonusDice.athletics) + nanEqualsZero(myFatebonds.athletics) + nanEqualsZero(myTempDice.athletics);
	effectiveAwarenessDice = skillsIndex.awareness + nanEqualsZero(myRelicBonusDice.awareness) + nanEqualsZero(myFatebonds.awareness) + nanEqualsZero(myTempDice.awareness);
	effectiveBrawlDice = skillsIndex.brawl + nanEqualsZero(myRelicBonusDice.brawl) + nanEqualsZero(myFatebonds.brawl) + nanEqualsZero(myTempDice.brawl);
	effectiveCommandDice = skillsIndex.command + nanEqualsZero(myRelicBonusDice.command) + nanEqualsZero(myFatebonds.command) + nanEqualsZero(myTempDice.command);
	effectiveControlDice = skillsIndex.control + nanEqualsZero(myRelicBonusDice.control) + nanEqualsZero(myFatebonds.control) + nanEqualsZero(myTempDice.control);
	effectiveCraftDice = skillsIndex.craft + nanEqualsZero(myRelicBonusDice.craft) + nanEqualsZero(myFatebonds.craft) + nanEqualsZero(myTempDice.craft);
	effectiveEmpathyDice = skillsIndex.empathy + nanEqualsZero(myRelicBonusDice.empathy) + nanEqualsZero(myFatebonds.empathy) + nanEqualsZero(myTempDice.empathy);
	effectiveFortitudeDice = skillsIndex.fortitude + nanEqualsZero(myRelicBonusDice.fortitude) + nanEqualsZero(myFatebonds.fortitude) + nanEqualsZero(myTempDice.fortitude);
	effectiveIntegrityDice = skillsIndex.integrity + nanEqualsZero(myRelicBonusDice.integrity) + nanEqualsZero(myFatebonds.integrity) + nanEqualsZero(myTempDice.integrity);
	effectiveInvestigationDice = skillsIndex.investigation + nanEqualsZero(myRelicBonusDice.investigation) + nanEqualsZero(myFatebonds.investigation) + nanEqualsZero(myTempDice.investigation);
	effectiveLarcenyDice = skillsIndex.larceny + nanEqualsZero(myRelicBonusDice.larceny) + nanEqualsZero(myFatebonds.larceny) + nanEqualsZero(myTempDice.larceny);
	effectiveMarksmanshipDice = skillsIndex.marksmanship + nanEqualsZero(myRelicBonusDice.marksmanship) + nanEqualsZero(myFatebonds.marksmanship) + nanEqualsZero(myTempDice.marksmanship);
	effectiveMedicineDice = skillsIndex.medicine + nanEqualsZero(myRelicBonusDice.medicine) + nanEqualsZero(myFatebonds.medicine) + nanEqualsZero(myTempDice.medicine);
	effectiveMeleeDice = skillsIndex.melee + nanEqualsZero(myRelicBonusDice.melee) + nanEqualsZero(myFatebonds.melee) + nanEqualsZero(myTempDice.melee);
	effectiveOccultDice = skillsIndex.occult + nanEqualsZero(myRelicBonusDice.occult) + nanEqualsZero(myFatebonds.occult) + nanEqualsZero(myTempDice.occult);
	effectivePoliticsDice = skillsIndex.politics + nanEqualsZero(myRelicBonusDice.politics) + nanEqualsZero(myFatebonds.politics) + nanEqualsZero(myTempDice.politics);
	effectivePresenceDice = skillsIndex.presence + nanEqualsZero(myRelicBonusDice.presence) + nanEqualsZero(myFatebonds.presence) + nanEqualsZero(myTempDice.presence);
	effectiveScienceDice = skillsIndex.science + nanEqualsZero(myRelicBonusDice.science) + nanEqualsZero(myFatebonds.science) + nanEqualsZero(myTempDice.science);
	effectiveStealthDice = skillsIndex.stealth + nanEqualsZero(myRelicBonusDice.stealth) + nanEqualsZero(myFatebonds.stealth) + nanEqualsZero(myTempDice.stealth);
	effectiveSurvivalDice = skillsIndex.survival + nanEqualsZero(myRelicBonusDice.survival) + nanEqualsZero(myFatebonds.survival) + nanEqualsZero(myTempDice.survival);
	effectiveThrownDice = skillsIndex.thrown + nanEqualsZero(myRelicBonusDice.thrown) + nanEqualsZero(myFatebonds.thrown) + nanEqualsZero(myTempDice.thrown);
	if(myCharacter['boons']['mystery']['unnaturalInsight'] == true && myValidChannelsList['mystery'] == true) {
		effectiveAwarenessDice += parseInt(effectiveNumberMystery);
	}
	for(var areteCharacter in genExceptionsMasterList['arete']) {
		if(myCharacter['selfName'] == areteCharacter) {
			if('academics' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveAcademicsDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['academics']['level']));}
			if('animalken' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveAnimalkenDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['animalken']['level']));}
			if('art' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveArtDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['art']['level']));}
			if('athletics' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveAthleticsDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['athletics']['level']));}
			if('awareness' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveAwarenessDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['awareness']['level']));}
			if('brawl' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveBrawlDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['brawl']['level']));}
			if('command' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveCommandDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['command']['level']));}
			if('control' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveControlDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['control']['level']));}
			if('craft' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveCraftDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['craft']['level']));}
			if('empathy' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveEmpathyDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['empathy']['level']));}
			if('fortitude' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveFortitudeDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['fortitude']['level']));}
			if('integrity' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveIntegrityDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['integrity']['level']));}
			if('investigation' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveInvestigationDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['investigation']['level']));}
			if('larceny' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveLarcenyDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['larceny']['level']));}
			if('marksmanship' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveMarksmanshipDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['marksmanship']['level']));}
			if('medicine' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveMedicineDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['medicine']['level']));}
			if('melee' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveMeleeDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['melee']['level']));}
			if('occult' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveOccultDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['occult']['level']));}
			if('politics' in genExceptionsMasterList['arete'][areteCharacter]) {effectivePoliticsDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['politics']['level']));}
			if('presence' in genExceptionsMasterList['arete'][areteCharacter]) {effectivePresenceDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['presence']['level']));}
			if('science' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveScienceDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['science']['level']));}
			if('stealth' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveStealthDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['stealth']['level']));}
			if('survival' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveSurvivalDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['survival']['level']));}
			if('thrown' in genExceptionsMasterList['arete'][areteCharacter]) {effectiveThrownDice += convertToEpic(nanEqualsZero(genExceptionsMasterList['arete'][areteCharacter]['thrown']['level']));}
		}
	}

	largerThanLifeDice = 0;
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel4'] == true) {
		largerThanLifeDice += 2;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel5'] == true) {
		largerThanLifeDice += 2;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel6'] == true) {
		largerThanLifeDice += 1;
	}
	if(myCharacter['characterPantheon'] == "Aesir" && myCharacter['boons']['psp']['pspLevel9'] == true) {
		largerThanLifeDice += 4;
	}

	if(genExceptionsMasterList['largerThanLife'][myCharacter['selfName']]) {
		largerThanLife = genExceptionsMasterList['largerThanLife'][myCharacter['selfName']]['value1'];
		switch (largerThanLife) {
			case "academics":
			effectiveAcademicsDice += largerThanLifeDice;
			break;
			case "animalken":
			effectiveAnimalkenDice += largerThanLifeDice;
			break;
			case "art":
			effectiveArtDice += largerThanLifeDice;
			break;
			case "athletics":
			effectiveAthleticsDice += largerThanLifeDice;
			break;
			case "awareness":
			effectiveAwarenessDice += largerThanLifeDice;
			break;
			case "brawl":
			effectiveBrawlDice += largerThanLifeDice;
			break;
			case "command":
			effectiveCommandDice += largerThanLifeDice;
			break;
			case "control":
			effectiveControlDice += largerThanLifeDice;
			break;
			case "craft":
			effectiveCraftDice += largerThanLifeDice;
			break;
			case "empathy":
			effectiveEmpathyDice += largerThanLifeDice;
			break;
			case "fortitude":
			effectiveFortitudeDice += largerThanLifeDice;
			break;
			case "integrity":
			effectiveIntegrityDice += largerThanLifeDice;
			break;
			case "investigation":
			effectiveInvestigationDice += largerThanLifeDice;
			break;
			case "larceny":
			effectiveLarcenyDice += largerThanLifeDice;
			break;
			case "marksmanship":
			effectiveMarksmanshipDice += largerThanLifeDice;
			break;
			case "medicine":
			effectiveMedicineDice += largerThanLifeDice;
			break;
			case "melee":
			effectiveMeleeDice += largerThanLifeDice;
			break;
			case "occult":
			effectiveOccultDice += largerThanLifeDice;
			break;
			case "politics":
			effectivePoliticsDice += largerThanLifeDice;
			break;
			case "presence":
			effectivePresenceDice += largerThanLifeDice;
			break;
			case "science":
			effectiveScienceDice += largerThanLifeDice;
			break;
			case "stealth":
			effectiveStealthDice += largerThanLifeDice;
			break;
			case "survival":
			effectiveSurvivalDice += largerThanLifeDice;
			break;
			case "thrown":
			effectiveThrownDice += largerThanLifeDice;
			break;
		}
	}

	if(myCharacter['characterPantheon'] == "Annuna" && myCharacter['boons']['psp']['pspLevel2'] == true) {
		if(myCharacter['relics']['Me']) {
			for(var channel in myCharacter['relics']['Me']['channels']) {
				switch(channel) {
					case "animal":
						effectiveAnimalkenDice += effectiveNumberAnimal;
						effectiveSurvivalDice += effectiveNumberAnimal;
					break;
					case "chaos":
						effectiveEmpathyDice += effectiveNumberChaos;
						effectivePresenceDice += effectiveNumberChaos;
					break;
					case "creation":
						effectiveArtDice += effectiveNumberCreation;
						effectiveCraftDice += effectiveNumberCreation;
					break;
					case "darkness":
						effectiveLarcenyDice += effectiveNumberDarkness;
						effectiveStealthDice += effectiveNumberDarkness;
					break;
					case "death":
						effectiveCommandDice += effectiveNumberDeath;
						effectiveOccultDice += effectiveNumberDeath;
					break;
					case "earth":
						effectiveFortitudeDice += effectiveNumberEarth;
						effectiveSurvivalDice += effectiveNumberEarth;
					break;
					case "fertility":
						effectiveMedicineDice += effectiveNumberFertility;
						effectiveSurvivalDice += effectiveNumberFertility;
					break;
					case "fire":
						effectiveArtDice += effectiveNumberFire;
						effectiveEmpathyDice += effectiveNumberFire;
					break;
					case "frost":
						effectiveCommandDice += effectiveNumberFrost;
						effectiveFortitudeDice += effectiveNumberFrost;
					break;
					case "guardian":
						effectiveAwarenessDice += effectiveNumberGuardian;
						effectiveIntegrityDice += effectiveNumberGuardian;
					break;
					case "health":
						effectiveFortitudeDice += effectiveNumberHealth;
						effectiveMedicineDice += effectiveNumberHealth;
					break;
					case "illusion":
						effectiveLarcenyDice += effectiveNumberIllusion;
						effectivePoliticsDice += effectiveNumberIllusion;
					break;
					case "justice":
						effectiveIntegrityDice += effectiveNumberJustice;
						effectiveInvestigationDice += effectiveNumberJustice;
					break;
					case "moon":
						effectiveAwarenessDice += effectiveNumberMoon;
						effectiveOccultDice += effectiveNumberMoon;
					break;
					case "psychopomp":
						effectiveAthleticsDice += effectiveNumberPsychopomp;
						effectiveControlDice += effectiveNumberPsychopomp;
					break;
					case "sky":
						effectiveMarksmanshipDice += effectiveNumberSky;
						effectiveThrownDice += effectiveNumberSky;
					break;
					case "star":
						effectiveAcademicsDice += effectiveNumberStar;
						effectiveSurvivalDice += effectiveNumberStar;
					break;
					case "sun":
						effectiveCommandDice += effectiveNumberSun;
						effectivePresenceDice += effectiveNumberSun;
					break;
					case "thunder":
						effectiveSurvivalDice += effectiveNumberThunder;
						effectiveThrownDice += effectiveNumberThunder;
					break;
					case "war":
						effectiveMarksmanshipDice += effectiveNumberWar;
						effectiveMeleeDice += effectiveNumberWar;
					break;
					case "water":
						effectiveAthleticsDice += effectiveNumberWater;
						effectiveFortitudeDice += effectiveNumberWater;
					break;
				}
			}
		}
	}

	effectiveAcademicsSucc = nanEqualsZero(myTempSucc.academics);
	effectiveAnimalkenSucc = nanEqualsZero(myTempSucc.animalken);
	effectiveArtSucc = nanEqualsZero(myTempSucc.art);
	effectiveAthleticsSucc = nanEqualsZero(myTempSucc.athletics);
	effectiveAwarenessSucc = nanEqualsZero(myTempSucc.awareness);
	effectiveBrawlSucc = nanEqualsZero(myTempSucc.brawl);
	effectiveCommandSucc = nanEqualsZero(myTempSucc.command);
	effectiveControlSucc = nanEqualsZero(myTempSucc.control);
	effectiveCraftSucc = nanEqualsZero(myTempSucc.craft);
	effectiveEmpathySucc = nanEqualsZero(myTempSucc.empathy);
	effectiveFortitudeSucc = nanEqualsZero(myTempSucc.fortitude);
	effectiveIntegritySucc = nanEqualsZero(myTempSucc.integrity);
	effectiveInvestigationSucc = nanEqualsZero(myTempSucc.investigation);
	effectiveLarcenySucc = nanEqualsZero(myTempSucc.larceny);
	effectiveMarksmanshipSucc = nanEqualsZero(myTempSucc.marksmanship);
	effectiveMedicineSucc = nanEqualsZero(myTempSucc.medicine);
	effectiveMeleeSucc = nanEqualsZero(myTempSucc.melee);
	effectiveOccultSucc = nanEqualsZero(myTempSucc.occult);
	effectivePoliticsSucc = nanEqualsZero(myTempSucc.politics);
	effectivePresenceSucc = nanEqualsZero(myTempSucc.presence);
	effectiveScienceSucc = nanEqualsZero(myTempSucc.science);
	effectiveStealthSucc = nanEqualsZero(myTempSucc.stealth);
	effectiveSurvivalSucc = nanEqualsZero(myTempSucc.survival);
	effectiveThrownSucc = nanEqualsZero(myTempSucc.thrown);
}
// this extracts Skills variables from the main object and modifies them
function getVirtuesValues() {
	virtuesIndex = myCharacter.virtues;
	myVirtueMod = 0;
	for(var tempMod in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempMod]['tempModifier'] == "VirtueRolls") {
			myVirtueMod += parseInt(myCharacter['tempModifier'][tempMod]['tempModifierLevel']);
		}
	}
	effectiveConvictionDice = fatebondLimitTen(virtuesIndex.conviction + nanEqualsZero(myRelicBonusDice.conviction) + nanEqualsZero(myTempDice.conviction) + myVirtueMod);
	myCharacter['virtues']['conviction'] = effectiveConvictionDice - myVirtueMod;
	effectiveCourageDice = fatebondLimitTen(virtuesIndex.courage + nanEqualsZero(myRelicBonusDice.courage) + nanEqualsZero(myTempDice.courage) + myVirtueMod);
	myCharacter['virtues']['courage'] = effectiveCourageDice - myVirtueMod;
	effectiveDutyDice = fatebondLimitTen(virtuesIndex.duty + nanEqualsZero(myRelicBonusDice.duty) + nanEqualsZero(myTempDice.duty) + myVirtueMod);
	myCharacter['virtues']['duty'] = effectiveDutyDice - myVirtueMod;
	effectiveEnduranceDice = fatebondLimitTen(virtuesIndex.endurance + nanEqualsZero(myRelicBonusDice.endurance) + nanEqualsZero(myTempDice.endurance) + myVirtueMod);
	myCharacter['virtues']['endurance'] = effectiveEnduranceDice - myVirtueMod;
	effectiveExpressionDice = fatebondLimitTen(virtuesIndex.expression + nanEqualsZero(myRelicBonusDice.expression) + nanEqualsZero(myTempDice.expression) + myVirtueMod);
	myCharacter['virtues']['expression'] = effectiveExpressionDice - myVirtueMod;
	effectiveHarmonyDice = fatebondLimitTen(virtuesIndex.harmony + nanEqualsZero(myRelicBonusDice.harmony) + nanEqualsZero(myTempDice.harmony) + myVirtueMod);
	myCharacter['virtues']['harmony'] = effectiveHarmonyDice - myVirtueMod;
	effectiveIntellectDice = fatebondLimitTen(virtuesIndex.intellect + nanEqualsZero(myRelicBonusDice.intellect) + nanEqualsZero(myTempDice.intellect) + myVirtueMod);
	myCharacter['virtues']['intellect'] = effectiveIntellectDice - myVirtueMod;
	effectiveLoyaltyDice = fatebondLimitTen(virtuesIndex.loyalty + nanEqualsZero(myRelicBonusDice.loyalty) + nanEqualsZero(myTempDice.loyalty) + myVirtueMod);
	myCharacter['virtues']['loyalty'] = effectiveLoyaltyDice - myVirtueMod;
	effectiveOrderDice = fatebondLimitTen(virtuesIndex.order + nanEqualsZero(myRelicBonusDice.order) + nanEqualsZero(myTempDice.order) + myVirtueMod);
	myCharacter['virtues']['order'] = effectiveOrderDice - myVirtueMod;
	effectivePietyDice = fatebondLimitTen(virtuesIndex.piety + nanEqualsZero(myRelicBonusDice.piety) + nanEqualsZero(myTempDice.piety) + myVirtueMod);
	myCharacter['virtues']['piety'] = effectivePietyDice - myVirtueMod;
	effectiveValorDice = fatebondLimitTen(virtuesIndex.valor + nanEqualsZero(myRelicBonusDice.valor) + nanEqualsZero(myTempDice.valor) + myVirtueMod);
	myCharacter['virtues']['valor'] = effectiveValorDice - myVirtueMod;
	effectiveVengeanceDice = fatebondLimitTen(virtuesIndex.vengeance + nanEqualsZero(myRelicBonusDice.vengeance) + nanEqualsZero(myTempDice.vengeance) + myVirtueMod);
	myCharacter['virtues']['vengeance'] = effectiveVengeanceDice - myVirtueMod;
	effectiveAmbitionDice = fatebondLimitTen(virtuesIndex.ambition + nanEqualsZero(myRelicBonusDice.ambition) + nanEqualsZero(myTempDice.ambition) + myVirtueMod);
	myCharacter['virtues']['ambition'] = effectiveAmbitionDice - myVirtueMod;
	effectiveAnarchyDice = fatebondLimitTen(virtuesIndex.anarchy + nanEqualsZero(myRelicBonusDice.anarchy) + nanEqualsZero(myTempDice.anarchy) + myVirtueMod);
	myCharacter['virtues']['anarchy'] = effectiveAnarchyDice - myVirtueMod;
	effectiveApathyDice = fatebondLimitTen(virtuesIndex.apathy + nanEqualsZero(myRelicBonusDice.apathy) + nanEqualsZero(myTempDice.apathy) + myVirtueMod);
	myCharacter['virtues']['apathy'] = effectiveApathyDice - myVirtueMod;
	effectiveCowardiceDice = fatebondLimitTen(virtuesIndex.cowardice + nanEqualsZero(myRelicBonusDice.cowardice) + nanEqualsZero(myTempDice.cowardice) + myVirtueMod);
	myCharacter['virtues']['cowardice'] = effectiveCowardiceDice - myVirtueMod;
	effectiveDestructionDice = fatebondLimitTen(virtuesIndex.destruction + nanEqualsZero(myRelicBonusDice.destruction) + nanEqualsZero(myTempDice.destruction) + myVirtueMod);
	myCharacter['virtues']['destruction'] = effectiveDestructionDice - myVirtueMod;
	effectiveDiscordDice = fatebondLimitTen(virtuesIndex.discord + nanEqualsZero(myRelicBonusDice.discord) + nanEqualsZero(myTempDice.discord) + myVirtueMod);
	myCharacter['virtues']['discord'] = effectiveDiscordDice - myVirtueMod;
	effectiveHeresyDice = fatebondLimitTen(virtuesIndex.heresy + nanEqualsZero(myRelicBonusDice.heresy) + nanEqualsZero(myTempDice.heresy) + myVirtueMod);
	myCharacter['virtues']['heresy'] = effectiveHeresyDice - myVirtueMod;
	effectiveIgnoranceDice = fatebondLimitTen(virtuesIndex.ignorance + nanEqualsZero(myRelicBonusDice.ignorance) + nanEqualsZero(myTempDice.ignorance) + myVirtueMod);
	myCharacter['virtues']['ignorance'] = effectiveIgnoranceDice - myVirtueMod;
	effectiveMaliceDice = fatebondLimitTen(virtuesIndex.malice + nanEqualsZero(myRelicBonusDice.malice) + nanEqualsZero(myTempDice.malice) + myVirtueMod);
	myCharacter['virtues']['malice'] = effectiveMaliceDice - myVirtueMod;
	effectiveRapacityDice = fatebondLimitTen(virtuesIndex.rapacity + nanEqualsZero(myRelicBonusDice.rapacity) + nanEqualsZero(myTempDice.rapacity) + myVirtueMod);
	myCharacter['virtues']['rapacity'] = effectiveRapacityDice - myVirtueMod;
	effectiveTreacheryDice = fatebondLimitTen(virtuesIndex.treachery + nanEqualsZero(myRelicBonusDice.treachery) + nanEqualsZero(myTempDice.treachery) + myVirtueMod);
	myCharacter['virtues']['treachery'] = effectiveTreacheryDice - myVirtueMod;
	effectiveTyrannyDice = fatebondLimitTen(virtuesIndex.tyranny + nanEqualsZero(myRelicBonusDice.tyranny) + nanEqualsZero(myTempDice.tyranny) + myVirtueMod);
	myCharacter['virtues']['tyranny'] = effectiveTyrannyDice - myVirtueMod;
	// effectiveConvictionSucc = nanEqualsZero(myTempSucc.conviction);
}
// this extracts Skills variables from the main object and modifies them
function getBoonsDiceValues() {
	effectiveAnimalDice = 0 + nanEqualsZero(myRelicBonusDice.animal) + nanEqualsZero(myFatebonds.animal) + nanEqualsZero(myTempDice.animal);
	effectiveChaosDice = 0 + nanEqualsZero(myRelicBonusDice.chaos) + nanEqualsZero(myFatebonds.chaos) + nanEqualsZero(myTempDice.chaos);
	effectiveCreationDice = 0 + nanEqualsZero(myRelicBonusDice.creation) + nanEqualsZero(myFatebonds.creation) + nanEqualsZero(myTempDice.creation);
	effectiveDarknessDice = 0 + nanEqualsZero(myRelicBonusDice.darkness) + nanEqualsZero(myFatebonds.darkness) + nanEqualsZero(myTempDice.darkness);
	effectiveDeathDice = 0 + nanEqualsZero(myRelicBonusDice.death) + nanEqualsZero(myFatebonds.death) + nanEqualsZero(myTempDice.death);
	effectiveEarthDice = 0 + nanEqualsZero(myRelicBonusDice.earth) + nanEqualsZero(myFatebonds.earth) + nanEqualsZero(myTempDice.earth);
	effectiveFertilityDice = 0 + nanEqualsZero(myRelicBonusDice.fertility) + nanEqualsZero(myFatebonds.fertility) + nanEqualsZero(myTempDice.fertility);
	effectiveFireDice = 0 + nanEqualsZero(myRelicBonusDice.fire) + nanEqualsZero(myFatebonds.fire) + nanEqualsZero(myTempDice.fire);
	effectiveFrostDice = 0 + nanEqualsZero(myRelicBonusDice.frost) + nanEqualsZero(myFatebonds.frost) + nanEqualsZero(myTempDice.frost);
	effectiveGuardianDice = 0 + nanEqualsZero(myRelicBonusDice.guardian) + nanEqualsZero(myFatebonds.guardian) + nanEqualsZero(myTempDice.guardian);
	effectiveHealthDice = 0 + nanEqualsZero(myRelicBonusDice.health) + nanEqualsZero(myFatebonds.health) + nanEqualsZero(myTempDice.health);
	effectiveIllusionDice = 0 + nanEqualsZero(myRelicBonusDice.illusion) + nanEqualsZero(myFatebonds.illusion) + nanEqualsZero(myTempDice.illusion);
	effectiveJusticeDice = 0 + nanEqualsZero(myRelicBonusDice.justice) + nanEqualsZero(myFatebonds.justice) + nanEqualsZero(myTempDice.justice);
	effectiveMagicDice = 0 + nanEqualsZero(myRelicBonusDice.magic) + nanEqualsZero(myFatebonds.magic) + nanEqualsZero(myTempDice.magic);
	effectiveMoonDice = 0 + nanEqualsZero(myRelicBonusDice.moon) + nanEqualsZero(myFatebonds.moon) + nanEqualsZero(myTempDice.moon);
	effectiveMysteryDice = 0 + nanEqualsZero(myRelicBonusDice.mystery) + nanEqualsZero(myFatebonds.mystery) + nanEqualsZero(myTempDice.mystery);
	effectiveProphecyDice = 0 + nanEqualsZero(myRelicBonusDice.prophecy) + nanEqualsZero(myFatebonds.prophecy) + nanEqualsZero(myTempDice.prophecy);
	effectivePsychopompDice = 0 + nanEqualsZero(myRelicBonusDice.psychopomp) + nanEqualsZero(myFatebonds.psychopomp) + nanEqualsZero(myTempDice.psychopomp);
	effectiveSkyDice = 0 + nanEqualsZero(myRelicBonusDice.sky) + nanEqualsZero(myFatebonds.sky) + nanEqualsZero(myTempDice.sky);
	effectiveStarDice = 0 + nanEqualsZero(myRelicBonusDice.star) + nanEqualsZero(myFatebonds.star) + nanEqualsZero(myTempDice.star);
	effectiveSunDice = 0 + nanEqualsZero(myRelicBonusDice.sun) + nanEqualsZero(myFatebonds.sun) + nanEqualsZero(myTempDice.sun);
	effectiveThunderDice = 0 + nanEqualsZero(myRelicBonusDice.thunder) + nanEqualsZero(myFatebonds.thunder) + nanEqualsZero(myTempDice.thunder);
	effectiveWarDice = 0 + nanEqualsZero(myRelicBonusDice.war) + nanEqualsZero(myFatebonds.war) + nanEqualsZero(myTempDice.war);
	effectiveWaterDice = 0 + nanEqualsZero(myRelicBonusDice.water) + nanEqualsZero(myFatebonds.water) + nanEqualsZero(myTempDice.water);

	effectiveAnimalSucc = nanEqualsZero(myTempSucc.animal);
	effectiveChaosSucc = nanEqualsZero(myTempSucc.chaos);
	effectiveCreationSucc = nanEqualsZero(myTempSucc.creation);
	effectiveDarknessSucc = nanEqualsZero(myTempSucc.darkness);
	effectiveDeathSucc = nanEqualsZero(myTempSucc.death);
	effectiveEarthSucc = nanEqualsZero(myTempSucc.earth);
	effectiveFertilitySucc = nanEqualsZero(myTempSucc.fertility);
	effectiveFireSucc = nanEqualsZero(myTempSucc.fire);
	effectiveFrostSucc = nanEqualsZero(myTempSucc.frost);
	effectiveGuardianSucc = nanEqualsZero(myTempSucc.guardian);
	effectiveHealthSucc = nanEqualsZero(myTempSucc.health);
	effectiveIllusionSucc = nanEqualsZero(myTempSucc.illusion);
	effectiveJusticeSucc = nanEqualsZero(myTempSucc.justice);
	effectiveMagicSucc = nanEqualsZero(myTempSucc.magic);
	effectiveMoonSucc = nanEqualsZero(myTempSucc.moon);
	effectiveMysterySucc = nanEqualsZero(myTempSucc.mystery);
	effectiveProphecySucc = nanEqualsZero(myTempSucc.prophecy);
	effectivePsychopompSucc = nanEqualsZero(myTempSucc.psychopomp);
	effectiveSkySucc = nanEqualsZero(myTempSucc.sky);
	effectiveStarSucc = nanEqualsZero(myTempSucc.star);
	effectiveSunSucc = nanEqualsZero(myTempSucc.sun);
	effectiveThunderSucc = nanEqualsZero(myTempSucc.thunder);
	effectiveWarSucc = nanEqualsZero(myTempSucc.war);
	effectiveWaterSucc = nanEqualsZero(myTempSucc.water);
}
// this gets the values for our preset rolls
function getPresetRolls() {
	effectiveMentalResistDice = effectiveWitsDice + effectiveIntegrityDice + nanEqualsZero(myTempDice.mentalResist) + nanEqualsZero(myRelicBonusDice.mentalResist);
	effectiveMentalResistSucc = effectiveWitsSucc + effectiveIntegritySucc + nanEqualsZero(myTempSucc.mentalResist);
	effectiveIntellectualJuggernautDice = effectiveIntelligenceDice + effectiveIntegrityDice + nanEqualsZero(myTempDice.socialResist) + nanEqualsZero(myRelicBonusDice.socialResist);
	effectiveIntellectualJuggernautSucc = effectiveIntelligenceSucc + effectiveIntegritySucc + nanEqualsZero(myTempSucc.socialResist);
	effectiveSocialResistDice = effectiveCharismaDice + effectiveIntegrityDice + nanEqualsZero(myTempDice.socialResist);
	effectiveSocialResistSucc = effectiveCharismaSucc + effectiveIntegritySucc + nanEqualsZero(myTempSucc.socialResist);
	effectiveWordsWillNeverDice = effectiveManipulationDice + effectiveIntegrityDice + nanEqualsZero(myTempDice.socialResist);
	effectiveWordsWillNeverSucc = effectiveManipulationSucc + effectiveIntegritySucc + nanEqualsZero(myTempSucc.socialResist);
	effectiveRapierWitDice = effectiveWitsDice + effectiveIntegrityDice + nanEqualsZero(myTempDice.socialResist);
	effectiveRapierWitSucc = effectiveWitsSucc + effectiveIntegritySucc + nanEqualsZero(myTempSucc.socialResist);
	effectiveBlockadeOfReasonDice = effectiveIntelligenceDice + effectiveIntegrityDice + nanEqualsZero(myTempDice.socialResist);
	effectiveBlockadeOfReasonSucc = effectiveIntelligenceSucc + effectiveIntegritySucc + nanEqualsZero(myTempSucc.socialResist);
	effectivePhysicalResistDice = effectiveStaminaDice + effectiveFortitudeDice + nanEqualsZero(myTempDice.physicalResist) + nanEqualsZero(myRelicBonusDice.physicalResist);
	effectivePhysicalResistSucc = effectiveStaminaSucc + effectiveFortitudeSucc + nanEqualsZero(myTempSucc.physicalResist);
	if(myCharacter['boons']['sun']['unflinchingGaze'] == true && myValidChannelsList['sun'] == true) {
		effectiveUnflinchingGazeDice = effectiveStaminaDice + effectiveFortitudeDice + nanEqualsZero(myTempDice.physicalResist);
		effectiveUnflinchingGazeSucc = effectiveStaminaSucc + effectiveFortitudeSucc + nanEqualsZero(myTempSucc.physicalResist) + (effectiveNumberSun * 2);
	}
	effectiveJoinBattleDice = effectiveWitsDice + effectiveAwarenessDice + nanEqualsZero(myTempDice.joinBattle);
	effectiveJoinBattleSucc = effectiveWitsSucc + effectiveAwarenessSucc + nanEqualsZero(myTempSucc.joinBattle);
	if(myCharacter['knacks']['epicPerception']['subliminalWarning'] == true) {
		effectiveJoinBattleDice += parseInt(myCharacter['epicAttributes']['epicPerception']);
	}
	if(myCharacter['knacks']['epicIntelligence']['tacticalPlanning'] == true) {
		effectiveJoinBattleDice += parseInt(myCharacter['epicAttributes']['epicIntelligence']);
	}
	if(myCharacter['boons']['prophecy']['dangerSense'] == true && myValidChannelsList['prophecy'] == true) {
		effectiveJoinBattleSucc += parseInt(effectiveNumberProphecy);
	}
	effectiveFeatOfStrengthDice = effectiveStrengthDice + effectiveAthleticsDice + nanEqualsZero(myTempDice.featOfStrength);
	effectiveFeatOfStrengthSucc = effectiveStrengthSucc + effectiveAthleticsSucc + nanEqualsZero(myTempSucc.featOfStrength);
	if(myCharacter['knacks']['epicStrength']['upliftingMight'] == true) {
		effectiveFeatOfStrengthSucc += parseInt(myCharacter['epicAttributes']['epicStrength']);
	}
	effectiveNumberFateDice = effectiveOccultDice + effectiveNumberMagic + effectiveNumberMystery + effectiveNumberProphecy + nanEqualsZero(myTempDice.numberFate) + nanEqualsZero(myRelicBonusDice.numberFate);
	effectiveNumberFateSucc = effectiveOccultSucc + nanEqualsZero(myTempSucc.numberFate);
	if(myCharacter['boons']['darkness']['shroudOfSecrecy'] == true && myValidChannelsList['darkness'] == true) {
		effectiveNumberFateDice += effectiveNumberDarkness;
	}
	if(((effectiveStrengthDice + effectiveBrawlDice) / 2) + (effectiveStrengthSucc + effectiveBrawlSucc) >= ((effectiveDexterityDice + effectiveBrawlDice) / 2) + (effectiveDexteritySucc + effectiveBrawlSucc)) {
		effectiveEscapeFromGrappleDice = effectiveStrengthDice + effectiveBrawlDice;
		effectiveEscapeFromGrappleSucc = effectiveStrengthSucc + effectiveBrawlSucc;
	} else {
		effectiveEscapeFromGrappleDice = effectiveDexterityDice + effectiveBrawlDice;
		effectiveEscapeFromGrappleSucc = effectiveDexteritySucc + effectiveBrawlSucc;
	}
	if(myCharacter['knacks']['epicDexterity']['escapeArtist'] == true) {
		effectiveEscapeFromGrappleDice += parseInt(myCharacter['epicAttributes']['epicDexterity']);
	}
	if(myCharacter['boons']['earth']['rootsOfTheMountain'] == true && myValidChannelsList['earth'] == true) {
		effectiveEscapeFromGrappleDice += effectiveNumberEarth;
	}
}
// this gets the values for attacks and damages
function getAttackBonuses() {
	relicsIndex = myCharacter.relics;
	for(var relicName in relicsIndex) {
		attackName = relicName + "Attack";
		damageName = relicName + "Damage";
		attackToLoad = {};
		damageToLoad = {};
		for(var bonusDice in relicsIndex[relicName]['bonusDice']) {
			if(bonusDice == attackName) {
				myAttackAttacks[bonusDice] = convertToEffectiveNumberBoons(relicsIndex[relicName]['bonusDice'][bonusDice]);
			}
			if(bonusDice == damageName) {
				myAttackDamages[bonusDice] = convertToEffectiveNumberBoons(relicsIndex[relicName]['bonusDice'][bonusDice]);
			}
			attackToLoad = myAttackAttacks[attackName];
			damageToLoad = myAttackDamages[damageName];
		}
		for(var itemEnhancements in relicsIndex[relicName]['itemEnhancements']) {
			if(itemEnhancements == attackName) {
				if(myCharacter.legend <= 4) {
					myAttackAttacks[itemEnhancements] = nanEqualsZero(attackToLoad) + parseInt(relicsIndex[relicName]['itemEnhancements'][itemEnhancements]);
				} else {
					myAttackAttacks[itemEnhancements] = nanEqualsZero(attackToLoad) + convertToEpic(parseInt(relicsIndex[relicName]['itemEnhancements'][itemEnhancements]));
				}
			}
			if(itemEnhancements == damageName) {
				if(myCharacter.legend <= 4) {
					myAttackDamages[itemEnhancements] = nanEqualsZero(damageToLoad) + parseInt(relicsIndex[relicName]['itemEnhancements'][itemEnhancements]);
				} else {
					myAttackDamages[itemEnhancements] = nanEqualsZero(damageToLoad) + convertToEpic(parseInt(relicsIndex[relicName]['itemEnhancements'][itemEnhancements]));
				}
			}
		}
	}
}




var diceValue;
var autoValue;
var totalValue;
var difficulty;
var result;
var botch;
var finished;
var finalResult;
var withExtra = 0;
function getNumbersGeneric() {
	diceValue = parseInt(document.getElementById('diceGeneric').value);
	if(isNaN(diceValue)){
		diceValue = 0;
	}
	autoValue = parseInt(document.getElementById('autoGeneric').value);
	if(isNaN(autoValue)){
		autoValue = 0;
	}
}
function rollDiceGeneric() {
	result = 0;
	botch = 0;
	finished = 0;
	finalResult = "";
	for(i = 0; i < diceValue; i++) {
		var singleDie = Math.floor(Math.random() * 10) + 1;
		if (singleDie >= 7) {
			result += 1;
			if (singleDie == 10) {
				result += 1;
			}
		}
		if (singleDie == 1) {
			botch += 1;
		}
	}
	finished = result - botch;
	if (finished >= 0) {
		result = result + autoValue;
		finalResult = "You have " + result + " successes!";
	} else {
		finalResult = "You have BOTCHED!";
	}
}
function clearFieldsGeneric() {
	diceGeneric.value = "";
	autoGeneric.value = "";
}
function rollGeneric() {
	getNumbersGeneric();
	if(diceValue != 0) {
		rollDiceGeneric();
		resultsAreaGeneric.innerHTML = finalResult;
		rollAgainButtonGeneric.innerHTML = "ROLL AGAIN (" + diceValue + "\[" + autoValue + "\])";
		clearFieldsGeneric();
	}
}
function rollAgainGeneric() {
	rollDiceGeneric();
	resultsAreaGeneric.innerHTML = finalResult;
	rollAgainButtonGeneric.innerHTML = "ROLL AGAIN (" + diceValue + "\[" + autoValue + "\])";
	clearFieldsGeneric();
}

function rollCatcher(withExtra, rollerAttributeEntry, rollerSkillEntry, rollerBoonEntry, rollerPurviewEntry, rollerVirtueEntry, rollerOtherEntry, rollerPresetEntry, attackRollEntry, damageRollEntry) {
	roll(withExtra, rollerAttributeEntry, rollerSkillEntry, rollerBoonEntry, rollerPurviewEntry, rollerVirtueEntry, rollerOtherEntry, rollerPresetEntry, attackRollEntry, damageRollEntry);
}
function roll(withExtra, rollerAttributeEntry, rollerSkillEntry, rollerBoonEntry, rollerPurviewEntry, rollerVirtueEntry, rollerOtherEntry, rollerPresetEntry, attackRollEntry, damageRollEntry) {
	if(withExtra == 0) {
		getEntryNumbers(withExtra, rollerAttributeEntry, rollerSkillEntry, rollerBoonEntry, rollerPurviewEntry, rollerVirtueEntry, rollerOtherEntry, rollerPresetEntry, attackRollEntry, damageRollEntry);
	} else {
		getEntryNumbers(withExtra, powersWithActivations[powerNameToRollExtra]['activationAttribute'], powersWithActivations[powerNameToRollExtra]['activationSkill'], powerLocToRollExtra, rollerPurviewEntry, rollerVirtueEntry, rollerOtherEntry, rollerPresetEntry, attackRollEntry, damageRollEntry);
	}
	if(autoValue < 0) {
		autoDif = autoValue *2;
		diceValue += autoDif;
		autoValue = 0;
	}
	if(diceValue < 1) {
		diceValue = 1;
	}
	rollDice();
	resultsArea.innerHTML = finalResult;
	rollAgainButton.innerHTML = "REROLL (" + diceValue + "\[" + autoValue + "\])";
	$('#presetroller').addClass('active');
	$('#powers').removeClass('active');
	$('#presetrollerTab').addClass('active');
	$('#powersTab').removeClass('active');
	window.scrollTo(0, 300);
	clearFields();
}
function getEntryNumbers(withExtra, rollerAttributeEntry, rollerSkillEntry, rollerBoonEntry, rollerPurviewEntry, rollerVirtueEntry, rollerOtherEntry, rollerPresetEntry, attackRollEntry, damageRollEntry) {
	difficulty = 0;

	var rollAttackDice = 0;
	var rollAttackSucc = 0;
	if(document.getElementById('attackRollEntry').value != "ChooseOne") {
		attackRoll = document.getElementById('attackRollEntry').value;
		rollerAttributeEntry = myCharacter['attacks'][attackRoll]['attackAttribute'];
		rollerSkillEntry = myCharacter['attacks'][attackRoll]['attackSkill'];
		rollAttackDice += parseInt(myCharacter['attacks'][attackRoll]['attackBase']);
		rollPlusAttack = document.getElementById('attackRollEntry').value + "Attack";
		rollAttackDice += nanEqualsZero(myAttackAttacks[rollPlusAttack]);
		if(myCharacter['knacks']['epicDexterity']['rapidStrike'] == true) {
			rollAttackDice += Math.round(parseInt(myCharacter['epicAttributes']['epicDexterity']) / 2);
		}
	}

	var rollDamageDice = 0;
	var rollDamageSucc = 0;
	if(document.getElementById('damageRollEntry').value != "ChooseOne") {
		damageRoll = document.getElementById('damageRollEntry').value;
		rollerAttributeEntry = myCharacter['attacks'][damageRoll]['damageAttribute'];
		rollDamageDice += parseInt(myCharacter['attacks'][damageRoll]['damageBase']);
		rollPlusDamage = document.getElementById('damageRollEntry').value + "Damage";
		rollDamageDice += nanEqualsZero(myAttackDamages[rollPlusDamage]);
		if(myCharacter['knacks']['epicStrength']['heavyHitter'] == true) {
			if(damageRoll == "Unarmed Clinch" || damageRoll == "Unarmed Heavy" || damageRoll == "Unarmed Light") {
				rollDamageDice += parseInt(myCharacter['epicAttributes']['epicStrength']);
			}
		}
		if(myCharacter['knacks']['epicStrength']['clobberingTime'] == true) {
			if(damageRoll == "Unarmed Clinch" || damageRoll == "Unarmed Heavy" || damageRoll == "Unarmed Light") {
				rollDamageDice += parseInt(myCharacter['epicAttributes']['epicStrength']);
			}
		}
	}

	for(var tempMod in myCharacter['tempModifier']) {
		if(myCharacter['tempModifier'][tempMod]['tempModifier'] == "attackrolls" && myCharacter['tempModifier'][tempMod]['tempModifierType'] == "bonusDice") {
			rollAttackDice += parseInt(myCharacter['tempModifier'][tempMod]['tempModifierLevel']);
		}
		if(myCharacter['tempModifier'][tempMod]['tempModifier'] == "attackrolls" && myCharacter['tempModifier'][tempMod]['tempModifierType'] == "bonusSuccesses") {
			rollAttackSucc += parseInt(myCharacter['tempModifier'][tempMod]['tempModifierLevel']);
		}
		if(myCharacter['tempModifier'][tempMod]['tempModifier'] == "damagerolls" && myCharacter['tempModifier'][tempMod]['tempModifierType'] == "bonusDice") {
			rollDamageDice += parseInt(myCharacter['tempModifier'][tempMod]['tempModifierLevel']);
		}
		if(myCharacter['tempModifier'][tempMod]['tempModifier'] == "damagerolls" && myCharacter['tempModifier'][tempMod]['tempModifierType'] == "bonusSuccesses") {
			rollDamageSucc += parseInt(myCharacter['tempModifier'][tempMod]['tempModifierLevel']);
		}
	}

	var rollAttrDice = 0;
	var rollAttrSucc = 0;
	switch(rollerAttributeEntry) {
		case 'strength':
		rollAttrDice = effectiveStrengthDice;
		rollAttrSucc = effectiveStrengthSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicStrength']));
		}
		break;
		case 'dexterity':
		rollAttrDice = effectiveDexterityDice;
		rollAttrSucc = effectiveDexteritySucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicDexterity']));
		}
		break;
		case 'stamina':
		rollAttrDice = effectiveStaminaDice;
		rollAttrSucc = effectiveStaminaSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicStamina']));
		}
		break;
		case 'charisma':
		rollAttrDice = effectiveCharismaDice;
		rollAttrSucc = effectiveCharismaSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicCharisma']));
		}
		break;
		case 'manipulation':
		rollAttrDice = effectiveManipulationDice;
		rollAttrSucc = effectiveManipulationSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicManipulation']));
		}
		break;
		case 'appearance':
		rollAttrDice = effectiveAppearanceDice;
		rollAttrSucc = effectiveAppearanceSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicAppearance']));
		}
		break;
		case 'perception':
		rollAttrDice = effectivePerceptionDice;
		rollAttrSucc = effectivePerceptionSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicPerception']));
		}
		break;
		case 'intelligence':
		rollAttrDice = effectiveIntelligenceDice;
		rollAttrSucc = effectiveIntelligenceSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicIntelligence']));
		}
		break;
		case 'wits':
		rollAttrDice = effectiveWitsDice;
		rollAttrSucc = effectiveWitsSucc;
		if(rollerBoonEntry == "magic" || rollerBoonEntry == "mystery" || rollerBoonEntry == "prophecy") {
			rollAttrSucc = rollAttrSucc - parseInt(convertToEpic(myCharacter['epicAttributes']['epicWits']));
		}
		break;
	}

	var rollSkillDice = 0;
	var rollSkillSucc = 0;
	switch(rollerSkillEntry) {
		case 'academics':
		rollSkillDice = effectiveAcademicsDice;
		rollSkillSucc = effectiveAcademicsSucc;
		break;
		case 'animalken':
		rollSkillDice = effectiveAnimalkenDice;
		rollSkillSucc = effectiveAnimalkenSucc;
		break;
		case 'art':
		rollSkillDice = effectiveArtDice;
		rollSkillSucc = effectiveArtSucc;
		break;
		case 'athletics':
		rollSkillDice = effectiveAthleticsDice;
		rollSkillSucc = effectiveAthleticsSucc;
		break;
		case 'awareness':
		rollSkillDice = effectiveAwarenessDice;
		rollSkillSucc = effectiveAwarenessSucc;
		break;
		case 'brawl':
		rollSkillDice = effectiveBrawlDice;
		rollSkillSucc = effectiveBrawlSucc;
		break;
		case 'command':
		rollSkillDice = effectiveCommandDice;
		rollSkillSucc = effectiveCommandSucc;
		break;
		case 'control':
		rollSkillDice = effectiveControlDice;
		rollSkillSucc = effectiveControlSucc;
		break;
		case 'craft':
		rollSkillDice = effectiveCraftDice;
		rollSkillSucc = effectiveCraftSucc;
		break;
		case 'empathy':
		rollSkillDice = effectiveEmpathyDice;
		rollSkillSucc = effectiveEmpathySucc;
		break;
		case 'fortitude':
		rollSkillDice = effectiveFortitudeDice;
		rollSkillSucc = effectiveFortitudeSucc;
		break;
		case 'integrity':
		rollSkillDice = effectiveIntegrityDice;
		rollSkillSucc = effectiveIntegritySucc;
		break;
		case 'investigation':
		rollSkillDice = effectiveInvestigationDice;
		rollSkillSucc = effectiveInvestigationSucc;
		break;
		case 'larceny':
		rollSkillDice = effectiveLarcenyDice;
		rollSkillSucc = effectiveLarcenySucc;
		break;
		case 'marksmanship':
		rollSkillDice = effectiveMarksmanshipDice;
		rollSkillSucc = effectiveMarksmanshipSucc;
		break;
		case 'medicine':
		rollSkillDice = effectiveMedicineDice;
		rollSkillSucc = effectiveMedicineSucc;
		break;
		case 'melee':
		rollSkillDice = effectiveMeleeDice;
		rollSkillSucc = effectiveMeleeSucc;
		break;
		case 'occult':
		rollSkillDice = effectiveOccultDice;
		rollSkillSucc = effectiveOccultSucc;
		break;
		case 'politics':
		rollSkillDice = effectivePoliticsDice;
		rollSkillSucc = effectivePoliticsSucc;
		break;
		case 'presence':
		rollSkillDice = effectivePresenceDice;
		rollSkillSucc = effectivePresenceSucc;
		break;
		case 'science':
		rollSkillDice = effectiveScienceDice;
		rollSkillSucc = effectiveScienceSucc;
		break;
		case 'stealth':
		rollSkillDice = effectiveStealthDice;
		rollSkillSucc = effectiveStealthSucc;
		break;
		case 'survival':
		rollSkillDice = effectiveSurvivalDice;
		rollSkillSucc = effectiveSurvivalSucc;
		break;
		case 'thrown':
		rollSkillDice = effectiveThrownDice;
		rollSkillSucc = effectiveThrownSucc;
		break;
	}

	var rollBoonDice = 0;
	var rollBoonSucc = 0;
	switch(rollerBoonEntry) {
		case 'animal':
		rollBoonDice = effectiveAnimalDice;
		rollBoonSucc = effectiveAnimalSucc;
		break;
		case 'chaos':
		rollBoonDice = effectiveChaosDice;
		rollBoonSucc = effectiveChaosSucc;
		break;
		case 'creation':
		rollBoonDice = effectiveCreationDice;
		rollBoonSucc = effectiveCreationSucc;
		break;
		case 'darkness':
		rollBoonDice = effectiveDarknessDice;
		rollBoonSucc = effectiveDarknessSucc;
		break;
		case 'death':
		rollBoonDice = effectiveDeathDice;
		rollBoonSucc = effectiveDeathSucc;
		break;
		case 'earth':
		rollBoonDice = effectiveEarthDice;
		rollBoonSucc = effectiveEarthSucc;
		break;
		case 'fertility':
		rollBoonDice = effectiveFertilityDice;
		rollBoonSucc = effectiveFertilitySucc;
		break;
		case 'fire':
		rollBoonDice = effectiveFireDice;
		rollBoonSucc = effectiveFireSucc;
		break;
		case 'frost':
		rollBoonDice = effectiveFrostDice;
		rollBoonSucc = effectiveFrostSucc;
		break;
		case 'guardian':
		rollBoonDice = effectiveGuardianDice;
		rollBoonSucc = effectiveGuardianSucc;
		break;
		case 'health':
		rollBoonDice = effectiveHealthDice;
		rollBoonSucc = effectiveHealthSucc;
		break;
		case 'illusion':
		rollBoonDice = effectiveIllusionDice;
		rollBoonSucc = effectiveIllusionSucc;
		break;
		case 'justice':
		rollBoonDice = effectiveJusticeDice;
		rollBoonSucc = effectiveJusticeSucc;
		break;
		case 'magic':
		rollBoonDice = effectiveMagicDice;
		rollBoonSucc = effectiveMagicSucc;
		break;
		case 'moon':
		rollBoonDice = effectiveMoonDice;
		rollBoonSucc = effectiveMoonSucc;
		break;
		case 'mystery':
		rollBoonDice = effectiveMysteryDice;
		rollBoonSucc = effectiveMysterySucc;
		break;
		case 'prophecy':
		rollBoonDice = effectiveProphecyDice;
		rollBoonSucc = effectiveProphecySucc;
		break;
		case 'psychopomp':
		rollBoonDice = effectivePsychopompDice;
		rollBoonSucc = effectivePsychopompSucc;
		break;
		case 'sky':
		rollBoonDice = effectiveSkyDice;
		rollBoonSucc = effectiveSkySucc;
		break;
		case 'star':
		rollBoonDice = effectiveStarDice;
		rollBoonSucc = effectiveStarSucc;
		break;
		case 'sun':
		rollBoonDice = effectiveSunDice;
		rollBoonSucc = effectiveSunSucc;
		break;
		case 'thunder':
		rollBoonDice = effectiveThunderDice;
		rollBoonSucc = effectiveThunderSucc;
		break;
		case 'war':
		rollBoonDice = effectiveWarDice;
		rollBoonSucc = effectiveWarSucc;
		break;
		case 'water':
		rollBoonDice = effectiveWaterDice;
		rollBoonSucc = effectiveWaterSucc;
		break;
	}

	var rollPurviewDice = 0;
	var rollPurviewSucc = 0;
	switch(rollerPurviewEntry) {
		case 'numberAnimal':
		rollPurviewDice = effectiveNumberAnimal;
		// rollPurviewSucc = numberAnimal;
		break;
		case 'numberChaos':
		rollPurviewDice = effectiveNumberChaos;
		// rollPurviewSucc = numberChaos;
		break;
		case 'numberCreation':
		rollPurviewDice = effectiveNumberCreation;
		// rollPurviewSucc = numberCreation;
		break;
		case 'numberDarkness':
		rollPurviewDice = effectiveNumberDarkness;
		// rollPurviewSucc = numberDarkness;
		break;
		case 'numberDeath':
		rollPurviewDice = effectiveNumberDeath;
		// rollPurviewSucc = numberDeath;
		break;
		case 'numberEarth':
		rollPurviewDice = effectiveNumberEarth;
		// rollPurviewSucc = numberEarth;
		break;
		case 'numberFertility':
		rollPurviewDice = effectiveNumberFertility;
		// rollPurviewSucc = numberFertility;
		break;
		case 'numberFire':
		rollPurviewDice = effectiveNumberFire;
		// rollPurviewSucc = numberFire;
		break;
		case 'numberFrost':
		rollPurviewDice = effectiveNumberFrost;
		// rollPurviewSucc = numberFrost;
		break;
		case 'numberGuardian':
		rollPurviewDice = effectiveNumberGuardian;
		// rollPurviewSucc = numberGuardian;
		break;
		case 'numberHealth':
		rollPurviewDice = effectiveNumberHealth;
		// rollPurviewSucc = numberHealth;
		break;
		case 'numberIllusion':
		rollPurviewDice = effectiveNumberIllusion;
		// rollPurviewSucc = numberIllusion;
		break;
		case 'numberJustice':
		rollPurviewDice = effectiveNumberJustice;
		// rollPurviewSucc = numberJustice;
		break;
		case 'numberMagic':
		rollPurviewDice = effectiveNumberMagic;
		// rollPurviewSucc = numberMagic;
		break;
		case 'numberMoon':
		rollPurviewDice = effectiveNumberMoon;
		// rollPurviewSucc = numberMoon;
		break;
		case 'numberMystery':
		rollPurviewDice = effectiveNumberMystery;
		// rollPurviewSucc = numberMystery;
		break;
		case 'numberProphecy':
		rollPurviewDice = effectiveNumberProphecy;
		// rollPurviewSucc = numberProphecy;
		break;
		case 'numberPsychopomp':
		rollPurviewDice = effectiveNumberPsychopomp;
		// rollPurviewSucc = numberPsychopomp;
		break;
		case 'numberSky':
		rollPurviewDice = effectiveNumberSky;
		// rollPurviewSucc = numberSky;
		break;
		case 'numberStar':
		rollPurviewDice = effectiveNumberStar;
		// rollPurviewSucc = numberStar;
		break;
		case 'numberSun':
		rollPurviewDice = effectiveNumberSun;
		// rollPurviewSucc = numberSun;
		break;
		case 'numberThunder':
		rollPurviewDice = effectiveNumberThunder;
		// rollPurviewSucc = numberThunder;
		break;
		case 'numberWar':
		rollPurviewDice = effectiveNumberWar;
		// rollPurviewSucc = numberWar;
		break;
		case 'numberWater':
		rollPurviewDice = effectiveNumberWater;
		// rollPurviewSucc = numberWater;
		break;
	}

	var rollVirtueDice = 0;
	var rollVirtueSucc = 0;
	switch(rollerVirtueEntry) {
		case 'conviction':
		rollVirtueDice = effectiveConvictionDice;
		// rollVirtueSucc = effectiveConvictionSucc;
		break;
		case 'courage':
		rollVirtueDice = effectiveCourageDice;
		// rollVirtueSucc = effectiveCourageSucc;
		break;
		case 'duty':
		rollVirtueDice = effectiveDutyDice;
		// rollVirtueSucc = effectiveDutySucc;
		break;
		case 'endurance':
		rollVirtueDice = effectiveEnduranceDice;
		// rollVirtueSucc = effectiveEnduranceSucc;
		break;
		case 'expression':
		rollVirtueDice = effectiveExpressionDice;
		// rollVirtueSucc = effectiveExpressionSucc;
		break;
		case 'harmony':
		rollVirtueDice = effectiveHarmonyDice;
		// rollVirtueSucc = effectiveExpressionSucc;
		break;
		case 'intellect':
		rollVirtueDice = effectiveIntellectDice;
		// rollVirtueSucc = effectiveIntellectSucc;
		break;
		case 'loyalty':
		rollVirtueDice = effectiveLoyaltyDice;
		// rollVirtueSucc = effectiveLoyaltySucc;
		break;
		case 'order':
		rollVirtueDice = effectiveOrderDice;
		// rollVirtueSucc = effectiveOrderSucc;
		break;
		case 'piety':
		rollVirtueDice = effectivePietyDice;
		// rollVirtueSucc = effectivePietySucc;
		break;
		case 'valor':
		rollVirtueDice = effectiveValorDice;
		// rollVirtueSucc = effectiveValorSucc;
		break;
		case 'vengeance':
		rollVirtueDice = effectiveVengeanceDice;
		rollVirtueSucc = effectiveVengeanceSucc;
		break;
		case 'ambition':
		rollVirtueDice = effectiveAmbitionnDice;
		break;
		case 'anarchy':
		rollVirtueDice = effectiveAnarchyDice;
		break;
		case 'apathy':
		rollVirtueDice = effectiveApathyDice;
		break;
		case 'cowardice':
		rollVirtueDice = effectiveCowardiceDice;
		break;
		case 'destruction':
		rollVirtueDice = effectiveDestructionDice;
		break;
		case 'discord':
		rollVirtueDice = effectiveDiscordDice;
		break;
		case 'heresy':
		rollVirtueDice = effectiveHeresyDice;
		break;
		case 'ignorance':
		rollVirtueDice = effectiveIgnoranceDice;
		break;
		case 'malice':
		rollVirtueDice = effectiveMaliceDice;
		break;
		case 'rapacity':
		rollVirtueDice = effectiveRapacityDice;
		break;
		case 'treachery':
		rollVirtueDice = effectiveTreacheryDice;
		break;
		case 'tyranny':
		rollVirtueDice = effectiveTyrannyDice;
		break;
	}

	var rollOtherDice = 0;
	var rollOtherSucc = 0;
	switch(rollerOtherEntry) {
		case 'legend':
		rollOtherDice = effectiveLegendDice;
		rollOtherSucc = effectiveLegendSucc;
		break;
		case 'willpower':
		rollOtherDice = effectiveWillpowerDice;
		rollOtherSucc = effectiveWillpowerSucc;
		break;
	}

	var rollPresetDice = 0;
	var rollPresetSucc = 0;
	switch(rollerPresetEntry) {
		case 'mentalResist':
		rollPresetDice = effectiveMentalResistDice;
		rollPresetSucc = effectiveMentalResistSucc;
		break;
		case 'socialResist':
		rollPresetDice = effectiveSocialResistDice;
		rollPresetSucc = effectiveSocialResistSucc;
		break;
		case 'wordsWillNeverHurtMe':
		rollPresetDice = effectiveWordsWillNeverDice;
		rollPresetSucc = effectiveWordsWillNeverSucc;
		break;
		case 'rapierWit':
		rollPresetDice = effectiveRapierWitDice;
		rollPresetSucc = effectiveRapierWitSucc;
		break;
		case 'intellectualJuggernaut':
		rollPresetDice = effectiveIntellectualJuggernautDice;
		rollPresetSucc = effectiveIntellectualJuggernautSucc;
		break;
		case 'blockadeOfReason':
		rollPresetDice = effectiveBlockadeOfReasonDice;
		rollPresetSucc = effectiveBlockadeOfReasonSucc;
		break;
		case 'physicalResist':
		rollPresetDice = effectivePhysicalResistDice;
		rollPresetSucc = effectivePhysicalResistSucc;
		break;
		case 'unflinchingGaze':
		rollPresetDice = effectiveUnflinchingGazeDice;
		rollPresetSucc = effectiveUnflinchingGazeSucc;
		break;
		case 'joinBattle':
		rollPresetDice = effectiveJoinBattleDice;
		rollPresetSucc = effectiveJoinBattleSucc;
		break;
		case 'featOfStrength':
		rollPresetDice = effectiveFeatOfStrengthDice;
		rollPresetSucc = effectiveFeatOfStrengthSucc;
		break;
		case 'numberFate':
		rollPresetDice = effectiveNumberFateDice;
		rollPresetSucc = effectiveNumberFateSucc;
		break;
		case 'escapeFromGrapple':
		rollPresetDice = effectiveEscapeFromGrappleDice;
		rollPresetSucc = effectiveEscapeFromGrappleSucc;
		break;
	}

	if(rollerSkillEntry != 'ChooseOne' && parseInt(myCharacter['skills'][rollerSkillEntry]) == 0) {
		if(myCharacter['knacks']['epicWits']['jackOfAllTrades'] == false) {
			rollAttrSucc = 0;
			difficulty = 2;
		}
	}
	adHocBonusDice = nanEqualsZero(parseInt(document.getElementById('adHocDice').value));
	adHocBonusSucc = nanEqualsZero(parseInt(document.getElementById('adHocSucc').value));
	if(adHocBonusSucc < 0) {
		difficulty += adHocBonusSucc * -1;
		adHocBonusSucc = 0;
	}
	if(document.getElementById('spentBennyEntry').checked == true) {
		adHocBonusSucc += 1;
	}
	if(document.getElementById('willpowerPointEntry').checked == true) {
		adHocBonusSucc += 1;
	}
	if(document.getElementById('resolveEntry').checked == true) {
		adHocBonusSucc += Math.round(myCharacter['skills']['integrity'] / 2);
		if(myCharacter['knacks']['epicCharisma']['righteousIndignation'] == true) {
			adHocBonusSucc += parseInt(myCharacter['epicAttributes']['epicCharisma']);
		}
	}
	if(document.getElementById('spiritualFortitudeExtraEntry') && document.getElementById('spiritualFortitudeExtraEntry').checked == true) {
		adHocBonusSucc += parseInt(effectiveNumberMystery);
	}
	if(document.getElementById('legendaryDeedEntry').checked == true) {
		adHocBonusSucc += parseInt(myCharacter['coreTraits']['legend']);
	}
	if(document.getElementById('multipleActionPenaltyEntry').checked == true && myCharacter['knacks']['epicWits']['multitasking'] == false) {
		adHocBonusDice -= 4;
	}
	if(document.getElementById('bonaFortunaExtraEntry') && document.getElementById('bonaFortunaExtraEntry').checked == true) {
		adHocBonusDice += parseInt(effectiveNumberMagic);
	}
	if(document.getElementById('luckyStarExtraEntry') && document.getElementById('luckyStarExtraEntry').checked == true) {
		adHocBonusDice += parseInt(effectiveNumberStar);
	}
	if(document.getElementById('karmaExtraEntry') && document.getElementById('karmaExtraEntry').checked == true) {
		adHocBonusDice += parseInt(myCharacter['coreTraits']['legend']);
	}
	var channelValue = 0;
	if(document.getElementById('virtueChannelEntry').value != 'ChooseOne') {
		switch(virtueChannelEntry.value) {
			case 'conviction':
			channelValue = convertToEpic(myCharacter['virtues']['conviction']) + myVirtueMod;
			break;
			case 'courage':
			channelValue = convertToEpic(myCharacter['virtues']['courage']) + myVirtueMod;
			break;
			case 'duty':
			channelValue = convertToEpic(myCharacter['virtues']['duty']) + myVirtueMod;
			break;
			case 'endurance':
			channelValue = convertToEpic(myCharacter['virtues']['endurance']) + myVirtueMod;
			break;
			case 'expression':
			channelValue = convertToEpic(myCharacter['virtues']['expression']) + myVirtueMod;
			break;
			case 'harmony':
			channelValue = convertToEpic(myCharacter['virtues']['harmony']) + myVirtueMod;
			break;
			case 'intellect':
			channelValue = convertToEpic(myCharacter['virtues']['intellect']) + myVirtueMod;
			break;
			case 'loyalty':
			channelValue = convertToEpic(myCharacter['virtues']['loyalty']) + myVirtueMod;
			if(myCharacter['relics']['Feig Velsig']['enabled'] == true) {
				channelValue += parseInt(myCharacter['coreTraits']['legend']);
			}
			break;
			case 'order':
			channelValue = convertToEpic(myCharacter['virtues']['order']) + myVirtueMod;
			break;
			case 'piety':
			channelValue = convertToEpic(myCharacter['virtues']['piety']) + myVirtueMod;
			break;
			case 'valor':
			channelValue = convertToEpic(myCharacter['virtues']['valor']) + myVirtueMod;
			break;
			case 'vengeance':
			channelValue = convertToEpic(myCharacter['virtues']['vengeance']) + myVirtueMod;
			break;
			case 'ambition':
			channelValue = convertToEpic(myCharacter['virtues']['ambition']) + myVirtueMod;
			break;
			case 'anarchy':
			channelValue = convertToEpic(myCharacter['virtues']['anarchy']) + myVirtueMod;
			break;
			case 'apathy':
			channelValue = convertToEpic(myCharacter['virtues']['apathy']) + myVirtueMod;
			break;
			case 'cowardice':
			channelValue = convertToEpic(myCharacter['virtues']['cowardice']) + myVirtueMod;
			break;
			case 'destruction':
			channelValue = convertToEpic(myCharacter['virtues']['destruction']) + myVirtueMod;
			break;
			case 'discord':
			channelValue = convertToEpic(myCharacter['virtues']['discord']) + myVirtueMod;
			break;
			case 'heresy':
			channelValue = convertToEpic(myCharacter['virtues']['heresy']) + myVirtueMod;
			break;
			case 'ignorance':
			channelValue = convertToEpic(myCharacter['virtues']['ignorance']) + myVirtueMod;
			break;
			case 'malice':
			channelValue = convertToEpic(myCharacter['virtues']['malice']) + myVirtueMod;
			break;
			case 'rapacity':
			channelValue = convertToEpic(myCharacter['virtues']['rapacity']) + myVirtueMod;
			break;
			case 'treachery':
			channelValue = convertToEpic(myCharacter['virtues']['treachery']) + myVirtueMod;
			break;
			case 'tyranny':
			channelValue = convertToEpic(myCharacter['virtues']['tyranny']) + myVirtueMod;
			break;
		}
	}
	adHocBonusDice += channelValue;
	diceValue = rollAttrDice + rollSkillDice + rollBoonDice + rollPurviewDice + rollVirtueDice + rollOtherDice + adHocBonusDice + rollPresetDice + rollAttackDice + rollDamageDice;
	autoValue = rollAttrSucc + rollSkillSucc + rollBoonSucc + rollPurviewSucc + rollVirtueSucc + rollOtherSucc + adHocBonusSucc + rollPresetSucc + rollAttackSucc + rollDamageSucc;
	if(document.getElementById('rollerAttributeEntry').value != "ChooseOne" || document.getElementById('rollerSkillEntry').value != "ChooseOne" || document.getElementById('rollerOtherEntry').value != "ChooseOne" || document.getElementById('rollerBoonEntry').value != "ChooseOne" || document.getElementById('rollerPurviewEntry').value != "ChooseOne" || document.getElementById('rollerPresetEntry').value != "ChooseOne" || document.getElementById('attackRollEntry').value != "ChooseOne" || document.getElementById('damageRollEntry').value != "ChooseOne") {
		for(var tempName in myCharacter['tempModifier']) {
			if(myCharacter['tempModifier'][tempName]['tempModifier'] == "global" && myCharacter['tempModifier'][tempName]['tempModifierType'] == "bonusDice") {
				diceValue += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
			}
			if(myCharacter['tempModifier'][tempName]['tempModifier'] == "global" && myCharacter['tempModifier'][tempName]['tempModifierType'] == "bonusSuccesses") {
				autoValue += parseInt(myCharacter['tempModifier'][tempName]['tempModifierLevel']);
			}
		}
	}
	console.log("rolling: " + diceValue + "[" + autoValue + "]");
}
function rollDice() {
	result = 0;
	botch = 0;
	finished = 0;
	finalResult = "Rolling " + diceValue + "[" + autoValue + "] at " + difficulty + " difficulty" + "... <br>";
	for(i = 0; i < diceValue; i++) {
		var singleDie = Math.floor(Math.random() * 10) + 1;
		if (singleDie >= 7) {
			result += 1;
			if (singleDie == 10) {
				result += 1;
			}
		}
		if (singleDie == 1) {
			botch += 1;
		}
	}
	finished = result - botch;
	if (finished >= 0) {
		result = result + autoValue - difficulty;
		finalResult += "You have " + result + " successes!";
	} else {
		finalResult += "You have BOTCHED!";
	}
}
function clearFields() {
	rollerAttributeEntry.value = "ChooseOne";
	rollerSkillEntry.value = "ChooseOne";
	rollerBoonEntry.value = "ChooseOne";
	rollerPurviewEntry.value = "ChooseOne";
	rollerVirtueEntry.value = "ChooseOne";
	rollerOtherEntry.value = "ChooseOne";
	multipleActionPenaltyEntry.checked = false;
	adHocDice.value = "";
	adHocSucc.value = "";
	legendaryDeedEntry.checked = false;
	willpowerPointEntry.checked = false;
	resolveEntry.checked = false;
	if(document.getElementById('spiritualFortitudeExtraEntry')) {
		spiritualFortitudeExtraEntry.checked = false;
	}
	if(document.getElementById('bonaFortunaExtraEntry')) {
		bonaFortunaExtraEntry.checked = false;
	}
	if(document.getElementById('luckyStarExtraEntry')) {
		luckyStarExtraEntry.checked = false;
	}
	if(document.getElementById('karmaExtraEntry')) {
		karmaExtraEntry.checked = false;
	}
	spentBennyEntry.checked = false;
	virtueChannelEntry.value = "ChooseOne";
	rollerPresetEntry.value = "ChooseOne";
	attackRollEntry.value="ChooseOne";
	damageRollEntry.value="ChooseOne";
}
function rollAgain() {
	rollDice();
	resultsArea.innerHTML = finalResult;
	rollAgainButton.innerHTML = "REROLL (" + diceValue + "\[" + autoValue + "\])";
	clearFields();
}
function activateWithExtra(powerName, powerLoc) {
	withExtra = 1;
	powerNameToRollExtra = powerName;
	powerLocToRollExtra = powerLoc;
}



function powerClickPassive() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var passive = document.getElementsByClassName('passive');
  for(i = 0; i < passive.length; i++) {
    passive[i].style.display = 'block';
  }
}
function powerClickReflexive() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var reflexive = document.getElementsByClassName('reflexive');
  for(i = 0; i < reflexive.length; i++) {
    reflexive[i].style.display = 'block';
  }
}
function powerClickReactive() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var reactive = document.getElementsByClassName('reactive');
  for(i = 0; i < reactive.length; i++) {
    reactive[i].style.display = 'block';
  }
}
function powerClickActivated() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var activated = document.getElementsByClassName('activated');
  for(i = 0; i < activated.length; i++) {
    activated[i].style.display = 'block';
  }
}
function powerClickDramatic() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var dramatic = document.getElementsByClassName('dramatic');
  for(i = 0; i < dramatic.length; i++) {
    dramatic[i].style.display = 'block';
  }
}
function powerClickRitual() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var ritual = document.getElementsByClassName('ritual');
  for(i = 0; i < ritual.length; i++) {
    ritual[i].style.display = 'block';
  }
}
function powerClickAll() {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'block';
  }
}
function powerClickNone() {
	var passive = document.getElementsByClassName('passive');
  for(i = 0; i < passive.length; i++) {
    passive[i].style.display = 'none';
  }
	var activated = document.getElementsByClassName('activated');
  for(i = 0; i < activated.length; i++) {
    activated[i].style.display = 'none';
  }
	var reflexive = document.getElementsByClassName('reflexive');
  for(i = 0; i < reflexive.length; i++) {
    reflexive[i].style.display = 'none';
  }
	var reactive = document.getElementsByClassName('reactive');
  for(i = 0; i < reactive.length; i++) {
    reactive[i].style.display = 'none';
  }
	var ritual = document.getElementsByClassName('ritual');
  for(i = 0; i < ritual.length; i++) {
    ritual[i].style.display = 'none';
  }
	var dramatic = document.getElementsByClassName('dramatic');
  for(i = 0; i < dramatic.length; i++) {
    dramatic[i].style.display = 'none';
  }
}

function powerClickCategory(categoryName) {
	var powerToggle = document.getElementsByClassName('powerToggle');
  for(i = 0; i < powerToggle.length; i++) {
    powerToggle[i].style.display = 'none';
  }
	var category = document.getElementsByClassName(categoryName);
  for(i = 0; i < category.length; i++) {
    category[i].style.display = 'block';
  }
}

function writeCategoryToggle() {
	categoryFiltersContent = "";

	categoryFiltersContent += "	<button onclick=\"powerClickCategory('psp')\">Pantheon</button>";
	if(effectiveNumberAnimal > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('animal')\">Animal</button>";
	}
	if(effectiveNumberChaos > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('chaos')\">Chaos</button>";
	}
	if(effectiveNumberCreation > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('creation')\">Creation</button>";
	}
	if(effectiveNumberDarkness > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('darkness')\">Darkness</button>";
	}
	if(effectiveNumberDeath > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('death')\">Death</button>";
	}
	if(effectiveNumberEarth > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('earth')\">Earth</button>";
	}
	if(effectiveNumberFertility > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('fertility')\">Fertility</button>";
	}
	if(effectiveNumberFire > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('fire')\">Fire</button>";
	}
	if(effectiveNumberFrost > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('frost')\">Frost</button>";
	}
	if(effectiveNumberGuardian > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('guardian')\">Guardian</button>";
	}
	if(effectiveNumberHealth > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('health')\">Health</button>";
	}
	if(effectiveNumberIllusion > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('illusion')\">Illusion</button>";
	}
	if(effectiveNumberJustice > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('justice')\">Justice</button>";
	}
	if(effectiveNumberMagic > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('magic')\">Magic</button>";
	}
	if(effectiveNumberMoon > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('moon')\">Moon</button>";
	}
	if(effectiveNumberMystery > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('mystery')\">Mystery</button>";
	}
	if(effectiveNumberProphecy > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('prophecy')\">Prophecy</button>";
	}
	if(effectiveNumberPsychopomp > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('psychopomp')\">Psychopomp</button>";
	}
	if(effectiveNumberSky > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('sky')\">Sky</button>";
	}
	if(effectiveNumberStar > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('star')\">Star</button>";
	}
	if(effectiveNumberSun > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('sun')\">Sun</button>";
	}
	if(effectiveNumberThunder > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('thunder')\">Thunder</button>";
	}
	if(effectiveNumberWar > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('war')\">War</button>";
	}
	if(effectiveNumberWater > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('water')\">Water</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicStrength']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicStrength')\">Strength</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicDexterity']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicDexterity')\">Dexterity</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicStamina']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicStamina')\">Stamina</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicCharisma']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicCharisma')\">Charisma</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicManipulation']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicManipulation')\">Manipulation</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicAppearance']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicAppearance')\">Appearance</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicPerception']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicPerception')\">Perception</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicIntelligence']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicIntelligence')\">Intelligence</button>";
	}
	if(parseInt(myCharacter['epicAttributes']['epicWits']) > 0) {
		categoryFiltersContent += "	<button onclick=\"powerClickCategory('epicWits')\">Wits</button>";
	}

	document.getElementById('categoryFilters').innerHTML = categoryFiltersContent;
}

// this adds a new Temporary Modifier to the character
function addNewTemp(affectedCharacter, tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration) {
	tempRef = ref.child(affectedCharacter + "/tempModifier/");
	var newTempModifier = {};
	newTempModifier['tempModifierLevel'] = convertToEffectiveNumberBoons(tempModifierLevel);
	newTempModifier['tempModifierDuration'] = tempModifierDuration;
	newTempModifier['tempModifierType'] = tempModifierType;
	newTempModifier['tempModifierSource'] = tempModifierSource;
	newTempModifier['tempModifier'] = tempModifier;
	tempRef.push(newTempModifier);
}
// this determines the appropriate target for a power and activates the addNewTempModifier method on that target
function applyToTarget(target, powerToAdd) {
	for(tempModName in powersWithModifiers) {
		if(tempModName == powerToAdd) {
			for(tempModifier in powersWithModifiers[tempModName]['tempModifiers']) {

				tempModifierDuration = powersWithModifiers[tempModName]['tempModifiers'][tempModifier]['tempModifierDuration'];
				tempModifierLevel = powersWithModifiers[tempModName]['tempModifiers'][tempModifier]['tempModifierLevel'];
				tempModifierType = powersWithModifiers[tempModName]['tempModifiers'][tempModifier]['tempModifierType'];
				tempModifierSource = powersWithModifiers[tempModName]['tempModifiers'][tempModifier]['tempModifierSource'];
				tempModifier = powersWithModifiers[tempModName]['tempModifiers'][tempModifier]['tempModifier'];

				for(var exception in genExceptionsMasterList['blessingExceptions']) {
					if(myCharacter['selfName'] == genExceptionsMasterList['blessingExceptions'][exception]['selfName']) {
						if(tempModifier == genExceptionsMasterList['blessingExceptions'][exception]['power']) {
							tempModifier = genExceptionsMasterList['blessingExceptions'][exception]['virtue'];
						}
					}
				}
				dcSelfName = myCharacter['selfName'];
				if(tempModifier == "##DestinysCall1") {
					tempModifier = genExceptionsMasterList['destinysCall'][dcSelfName]['value1'];
				}
				if(tempModifier == "##DestinysCall2") {
					tempModifier = genExceptionsMasterList['destinysCall'][dcSelfName]['value2'];
				}
				if(tempModifier == "##DestinysCall3") {
					tempModifier = genExceptionsMasterList['destinysCall'][dcSelfName]['value3'];
				}
				if(tempModifier == "##DestinysCall4") {
					tempModifier = genExceptionsMasterList['destinysCall'][dcSelfName]['value4'];
				}
				if(tempModifier == "##DestinysCall5") {
					tempModifier = genExceptionsMasterList['destinysCall'][dcSelfName]['value5'];
				}

				if(tempModifier == "##AnimalAspectSkill") {
					tempModifier = genExceptionsMasterList['animalAspect'][dcSelfName]['value1'];
				}
				if(tempModifier == "##AnimalAuraAttribute") {
					tempModifier = genExceptionsMasterList['animalAura'][dcSelfName]['value1'];
				}
				if(tempModifier == "##AnimalEssencePurview") {
					tempModifier = genExceptionsMasterList['animalEssence'][dcSelfName]['value1'];
				}

				if(tempModifier == "##HumataAttribute") {
					tempModifier = genExceptionsMasterList['humata'][dcSelfName]['value1'];
				}


				if(target == "self") {
					addNewTempModifier(tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration);
				}
				if(target == "all") {
					for(var characterName in characterList) {
						if(characterList[characterName]['visible'] == true) {
							addNewTemp(characterName, tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration);
						}
					}
				}
				if(target == "friendly") {
					for(var characterName in characterList) {
						if(characterList[characterName]['friendly'] == myCharacter['friendly']) {
							addNewTemp(characterName, tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration);
						}
					}
				}
				if(target == "friendlyNotYou") {
					for(var characterName in characterList) {
						if(characterList[characterName]['friendly'] == myCharacter['friendly'] && characterName != myCharacter['selfName']) {
							addNewTemp(characterName, tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration);
						}
					}
				}
				if(target == "allNotYou") {
					for(var characterName in characterList) {
						if(characterList[characterName]['visible'] == true && characterName != myCharacter['selfName']) {
							addNewTemp(characterName, tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration);
						}
					}
				}
				for(var characterName in characterList) {
					if(characterName == target) {
						addNewTemp(characterName, tempModifierLevel, tempModifierType, tempModifierSource, tempModifier, tempModifierDuration);
					}
				}
			}
		}
	}
	window.setTimeout(function(){location.reload()},1000);
}



function checkRelicExceptions() {
	for(var exception in genExceptionsMasterList['relicExceptions']) {
		relicIsEnabled = genExceptionsMasterList['relicExceptions'][exception]['enabled'];
		property1 = genExceptionsMasterList['relicExceptions'][exception]['property1'];
		property2 = genExceptionsMasterList['relicExceptions'][exception]['property2'];
		property3 = genExceptionsMasterList['relicExceptions'][exception]['property3'];
		propertyChange = genExceptionsMasterList['relicExceptions'][exception]['change'];
		if(genExceptionsMasterList['relicExceptions'][exception]['selfName'] == myCharacter['selfName'] && myCharacter['relics'][relicIsEnabled]['enabled'] == true) {
			powerMasterList[property1][property2][property3] = propertyChange;
		}
	}
}

function writePowerDetails() {
	writeCategoryToggle();

	switch(myCharacter['pantheonPurview']) {
		case "Arete":
		powerMasterList['psp'] = pspMasterList['arete'];
		break;
		case "Asha":
		powerMasterList['psp'] = pspMasterList['asha'];
		break;
		case "Dvoeverie":
		powerMasterList['psp'] = pspMasterList['dvoeverie'];
		break;
		case "Heku":
		powerMasterList['psp'] = pspMasterList['heku'];
		break;
		case "Itztli":
		powerMasterList['psp'] = pspMasterList['itztli'];
		break;
		case "Jotunblut":
		powerMasterList['psp'] = pspMasterList['jotunblut'];
		break;
		case "Malak":
		powerMasterList['psp'] = pspMasterList['malak'];
		break;
		case "Me":
		powerMasterList['psp'] = pspMasterList['me'];
		break;
		case "Samsara":
		powerMasterList['psp'] = pspMasterList['samsara'];
		break;
		case "Tsukumogami":
		powerMasterList['psp'] = pspMasterList['tsukumogami'];
		break;
		case "Wuxing":
		powerMasterList['psp'] = pspMasterList['wuxing'];
		break;
	}

	checkRelicExceptions();

	if(myCharacter['selfName'] == "Marcela" && myCharacter['relics']['Aitzcuauhtli']['enabled'] == true) {
		powerMasterList['epicDexterity']['rollWithIt']['powerText'] = "Add <span style=\"color: red\">+" + parseInt(myCharacter['epicAttributes']['epicDexterity']) * 2 + "</span> to your Soak against one successful attack against you.";
	}
	if(myCharacter['selfName'] == "Marcela" && myCharacter['relics']['Aitzcuauhtli']['enabled'] == true) {
		powerMasterList['water']['renewal']['powerText'] = "By submerging an injury in water for a full minute, you can heal your own wounds, washing away blood and injury to leave yourself restored. This Boon may be used once per day to heal <span style=\"color: red\">" + parseInt(effectiveNumberWater * 2) + "</span> Health Levels in any combination of Bashing and/or Lethal damage.";
	}
	if(myCharacter['selfName'] == "Enoch" && myCharacter['relics']['Discretion']['enabled'] == true) {
		powerMasterList['illusion']['shadowPartner']['powerText'] = "In combat you cause yourself to be not quite where your attacker thought you were by creating a confusing illusory duplicate of yourself in the moment of the attack. You may reflexively add <span style=\"color: red\">+" + parseInt(effectiveNumberIllusion + myCharacter['coreTraits']['legend']) + "</span> to your DV against a single physical attack that would have otherwise hit you.";
	}
	if(myCharacter['selfName'] == "Shrimati" && myCharacter['relics']['The Gold Card']['enabled'] == true) {
		tradingFatesNewValue = Math.round(parseInt(effectiveNumberMagic / 2)) + parseInt(myCharacter['coreTraits']['legend']);
		powerMasterList['magic']['tradingFates']['tempModifiers']['tempModifier1']['tempModifierLevel'] = tradingFatesNewValue;
		powerMasterList['magic']['tradingFates']['powerText'] = "You can grant another person <span style=\"color: red\">+" + tradingFatesNewValue + "</span> bonus dice to all actions for the rest of the scene. The Legend cost of this power can be waived by instead forsaking one use of Bona Fortuna.";
	}
	if(myCharacter['selfName'] == "Marcela" && myCharacter['relics']['Quetzalitztli']['enabled'] == true) {
		stormAugNewValue = effectiveNumberThunder + parseInt(myCharacter['coreTraits']['legend']);
		powerMasterList['thunder']['stormAugmentation']['tempModifiers']['tempModifier1']['tempModifierLevel'] = stormAugNewValue;
		powerMasterList['thunder']['stormAugmentation']['powerText'] = "You invest your attacks with deadly electrical force for the rest of the scene, adding +<span style=\"color: red\">" + stormAugNewValue + "</span> bonus dice to all damage rolls. If you successfully strike and damage a target with that weapon, you may reflexively spend an additional 2 Legend; if you do so, the target is stunned by the shocking overload of the attack and must add two ticks to the amount of time before he can act again.";
	}

	powersWithActivations = {};
	for(var powerClass in powerMasterList) {
		if(powerClass.indexOf("epic") > -1) {
			classBuilder = "knacks";
		} else {
			classBuilder = "boons";
		}
		for(var powerName in powerMasterList[powerClass]) {
			newPower = {};
			if(powerMasterList[powerClass][powerName]['powerActivationAttribute'] != null) {
				powerKey = "activationAttribute";
				newPower[powerKey] = powerMasterList[powerClass][powerName]['powerActivationAttribute'];
			}
			if(powerMasterList[powerClass][powerName]['powerActivationSkill'] != null) {
				powerKey = "activationSkill";
				newPower[powerKey] = powerMasterList[powerClass][powerName]['powerActivationSkill'];
			}
			if(powerMasterList[powerClass][powerName]['powerActivationBoon'] != null) {
				powerKey = "activationBoon";
				newPower[powerKey] = powerMasterList[powerClass][powerName]['powerActivationBoon'];
			}
			if(powerMasterList[powerClass][powerName]['powerActivationAttribute'] != null || powerMasterList[powerClass][powerName]['powerActivationSkill'] != null) {
				powersWithActivations[powerName] = newPower;
			}
		}
	}

	powersWithModifiers = {};
	for(var powerClass in powerMasterList) {
		if(powerClass.indexOf("epic") > -1) {
			classBuilder = "knacks";
		} else {
			classBuilder = "boons";
		}
		for(var powerName in powerMasterList[powerClass]) {
			if(powerMasterList[powerClass][powerName]['tempModifiers'] != null) {
				newPower = {};
				newPower['tempModifiers'] = powerMasterList[powerClass][powerName]['tempModifiers'];
				powersWithModifiers[powerName] = newPower;
			}
		}
	}

	for(var powerClass in powerMasterList) {
		attributeToRoll = "";
		skillToRoll = "";
		powerClassList = "";
		if(powerClass.indexOf("epic") > -1) {
			classBuilder = "knacks";
		} else {
			classBuilder = "boons";
		}
		detailsBuilder = powerClass + capitalizeFirstLetter(classBuilder) + "Details";
		for(var powerName in powerMasterList[powerClass]) {
			if(detailsBuilder.indexOf("Knacks") > -1 || myValidChannelsList[powerClass] == true) {
				powerString = "";
				if(myCharacter[classBuilder][powerClass][powerName] == true) {
					powerString += "<div class=\"" + lowercaseFirstLetter(powerMasterList[powerClass][powerName]['powerActivation']) + " " + powerClass + " powerToggle\" style=\"display: inline\" id=\"" + powerName + "Div" + "\">";
					powerString += "<strong>" + powerMasterList[powerClass][powerName]['powerTitle'] + "</strong> - ";
					if(powerMasterList[powerClass][powerName]['powerLevel'] != null) {
						powerString += "Level " + powerMasterList[powerClass][powerName]['powerLevel'] + " ";
					}
					powerString += powerMasterList[powerClass][powerName]['powerType'];
					powerString += "<br>";
					powerString += "Activation: " + capitalizeFirstLetter(powerMasterList[powerClass][powerName]['powerActivation']) + "<br>";
					if(powerMasterList[powerClass][powerName]['powerCost'] != null) {
						powerString += "Cost: " + powerMasterList[powerClass][powerName]['powerCost'] + "<br>";
					}
					if(powerMasterList[powerClass][powerName]['powerActivationAttribute'] != null || powerMasterList[powerClass][powerName]['powerActivationSkill'] != null) {
						powerString += "Dice Pool: ";
						if(powerMasterList[powerClass][powerName]['powerActivationAttribute'] != null) {
							powerString += capitalizeFirstLetter(powerMasterList[powerClass][powerName]['powerActivationAttribute']);
						}
						if(powerMasterList[powerClass][powerName]['powerActivationAttribute'] != null || powerMasterList[powerClass][powerName]['powerActivationSkill'] != null) {
							powerString += " + ";
						}
						if(powerMasterList[powerClass][powerName]['powerActivationSkill'] != null) {
							powerString += capitalizeFirstLetter(powerMasterList[powerClass][powerName]['powerActivationSkill']);
						}
						if(powerMasterList[powerClass][powerName]['powerActivationOpposed'] != null) {
							powerString += " vs. " + powerMasterList[powerClass][powerName]['powerActivationOpposed'];
						}
						buttonId = powerName + "Roller";
						powerString += " <button id=\"" + buttonId + "\"onclick=\"rollCatcher(0, powersWithActivations[this.id.replace('Roller', '')]['activationAttribute'], powersWithActivations[this.id.replace('Roller', '')]['activationSkill'], powersWithActivations[this.id.replace('Roller', '')]['activationBoon'], document.getElementById('rollerPurviewEntry').value, document.getElementById('rollerVirtueEntry').value, document.getElementById('rollerOtherEntry').value, document.getElementById('rollerPresetEntry').value, document.getElementById('attackRollEntry').value, document.getElementById('damageRollEntry').value)\">ROLL</button>";
						powerString += " <button type=\"button\" data-toggle=\"modal\" data-target=\"#rollExtraModal\" onclick=\"activateWithExtra('" + powerName + "', '" + powerClass + "')\">ROLL++</button>";
						powerString += "<br>";
					}

					if(powerMasterList[powerClass][powerName]['powerTarget'] != null) {
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "self") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget('self', this.id.replace('Activate', ''))\">Activate</button>";
						}
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "all") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget('all', this.id.replace('Activate', ''))\">Activate</button>";
						}
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "friendly") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget('friendly', this.id.replace('Activate', ''))\">Activate</button>";
						}
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "friendlyNotYou") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget('friendlyNotYou', this.id.replace('Activate', ''))\">Activate</button>";
						}
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "allNotYou") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget('allNotYou', this.id.replace('Activate', ''))\">Activate</button>";
						}
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "target") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							targetListId = powerName + "TargetList";
							var targetList = "<select id=\"" + targetListId + "\">"
							targetList += "<option id=\"ChooseOne\">Choose Target</option>";
							for(var characterName in characterList) {
								if(characterList[characterName]['visible'] == true) {
									targetList += "<option id=\"" + characterName + "\">" + characterName + "</option>";
								}
							}
							targetList += "</select>";
							powerString += targetList;
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget(document.getElementById('" + targetListId + "').value, this.id.replace('Activate', ''))\">Activate</button>";
						}
						if(powerMasterList[powerClass][powerName]['powerTarget'] == "targetNotYou") {
							powerToAdd = powerName;
							powerClassToAdd = powerClass;
							activateId = powerName + "Activate";
							targetListId = powerName + "TargetList";
							var targetList = "<select id=\"" + targetListId + "\">"
							targetList += "<option id=\"ChooseOne\">Choose Target</option>";
							for(var characterName in characterList) {
								if(characterList[characterName]['visible'] == true && myCharacter['selfName'] != characterName) {
									targetList += "<option id=\"" + characterName + "\">" + characterName + "</option>";
								}
							}
							targetList += "</select>";
							powerString += targetList;
							powerString += "<button id=\"" + activateId + "\" type=\"button\" data-toggle=\"modal\" data-target=\"#pleaseWaitModal\" onclick=\"applyToTarget(document.getElementById('" + targetListId + "').value, this.id.replace('Activate', ''))\">Activate</button>";
						}
						powerString += "<br>";
					}

					if(powerMasterList[powerClass][powerName]['powerText'] != null) {

						powerString += powerMasterList[powerClass][powerName]['powerText'] + "<br>";

						for(var exception in genExceptionsMasterList['blessingExceptions']) {
							if(myCharacter['selfName'] == genExceptionsMasterList['blessingExceptions'][exception]['selfName']) {
								var blessingPower = genExceptionsMasterList['blessingExceptions'][exception]['power'];
								var blessingVirtue = capitalizeFirstLetter(genExceptionsMasterList['blessingExceptions'][exception]['virtue']);
								powerString = powerString.replace(blessingPower, blessingVirtue);
							}
						}
						if(genExceptionsMasterList['humata'][myCharacter['selfName']]) {
							if(myCharacter['boons']['psp']['pspLevel1'] == true) {
								powerString = powerString.replace(/##HumataAttribute/g, capitalizeFirstLetter(genExceptionsMasterList['humata'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['largerThanLife'][myCharacter['selfName']]) {
							if(myCharacter['boons']['psp']['pspLevel4'] == true) {
								powerString = powerString.replace(/##LargerThanLife/g, capitalizeFirstLetter(genExceptionsMasterList['largerThanLife'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['giantAmongMen'][myCharacter['selfName']]) {
							if(myCharacter['boons']['psp']['pspLevel6'] == true) {
								powerString = powerString.replace(/##GiantAmongMen/g, capitalizeFirstLetter(genExceptionsMasterList['giantAmongMen'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['giantAmongGods'][myCharacter['selfName']]) {
							if(myCharacter['boons']['psp']['pspLevel8'] == true) {
								powerString = powerString.replace(/##GiantAmongGods/g, capitalizeFirstLetter(genExceptionsMasterList['giantAmongGods'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['animalAspect'][myCharacter['selfName']]) {
							if(myCharacter['boons']['animal']['animalAspect'] == true) {
								powerString = powerString.replace(/##AnimalAspectSkill/g, capitalizeFirstLetter(genExceptionsMasterList['animalAspect'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['animalEssence'][myCharacter['selfName']]) {
							if(myCharacter['boons']['animal']['animalEssence'] == true) {
								powerString = powerString.replace(/##AnimalEssencePurview/g, capitalizeFirstLetter(genExceptionsMasterList['animalEssence'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['animalAura'][myCharacter['selfName']]) {
							if(myCharacter['boons']['animal']['animalAura'] == true) {
								powerString = powerString.replace(/##AnimalAuraAttribute/g, capitalizeFirstLetter(genExceptionsMasterList['animalAura'][myCharacter['selfName']]['value1']));
							}
						}
						if(genExceptionsMasterList['cloakOfSeasons'][myCharacter['selfName']]) {
							if(genExceptionsMasterList['cloakOfSeasons'][myCharacter['selfName']]['value1'] == "spring") {powerString = powerString.replace(/##CloakOfSeasonsText/g, "As a manifestation of Spring, these Deeds can be applied to any Appearance, Wits, Animal Ken, or Survival roll, as well as any activations for Animal, Health, or Water Boons.");}
							if(genExceptionsMasterList['cloakOfSeasons'][myCharacter['selfName']]['value1'] == "summer") {powerString = powerString.replace(/##CloakOfSeasonsText/g, "As a manifestation of Summer, these Deeds can be applied to any Charisma, Stamina, Animal Ken, or Survival roll, as well as any activations for Earth, Fire, or Sun Boons.");}
							if(genExceptionsMasterList['cloakOfSeasons'][myCharacter['selfName']]['value1'] == "autumn") {powerString = powerString.replace(/##CloakOfSeasonsText/g, "As a manifestation of Autumn, these Deeds can be applied to any Manipulation, Perception, Animal Ken, or Survival rolls, as well as any activations for Death, Health, or Thunder Boons. ");}
							if(genExceptionsMasterList['cloakOfSeasons'][myCharacter['selfName']]['value1'] == "winter") {powerString = powerString.replace(/##CloakOfSeasonsText/g, "As a manifestation of Winter, these Deeds can be applied to any Strength, Intelligence, Animal Ken, or Survival rolls, as well as any activations for Darkness, Frost, or Sky Boons.");}
						}
						if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]) {
							if(myCharacter['boons']['animal']['animalFeature'] == true) {
								afTable = "<table><tr><td>Feature</td><td>Legend Cost</td><td>Benefit</td></tr>";
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['wings'] == true) {afTable += "<tr><td> Wings</td><td>4</td><td>Ability to Fly</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['gills'] == true) {afTable += "<tr><td> Gills</td><td>2</td><td>Ability to Breathe Underwater</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['poisonFangs'] == true) {afTable += "<tr><td> Poison Fangs</td><td>3</td><td>bites against unarmored targets inflict a poison that deals (Stamina + Animal Ken) Lethal damage, 3/action, with a -1/2 ##Animal die penalty</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['finsWebbing'] == true) {afTable += "<tr><td> Fins/Webbing</td><td>1</td><td>no DV or Movement penalties associated with Swimming</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['eyes'] == true) {afTable += "<tr><td><button onclick=\"addNewTempModifier('#animal', 'bonusDice', 'Animal Feature', 'investigation', 'scene'); location.reload();\">Activate</button> Eyes</td><td>2</td><td>+##Animal to Investigation rolls</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['ears'] == true) {afTable += "<tr><td><button onclick=\"addNewTempModifier('#animal', 'bonusDice', 'Animal Feature', 'awareness', 'scene'); location.reload();\">Activate</button> Ears</td><td>2</td><td>+##Animal to Awareness rolls</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['nose'] == true) {afTable += "<tr><td><button onclick=\"addNewTempModifier('#animal', 'bonusDice', 'Animal Feature', 'survival', 'scene'); location.reload();\">Activate</button> Nose</td><td>2</td><td>+##Animal to Survival rolls</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['tail'] == true) {afTable += "<tr><td><button onclick=\"addNewTempModifier('#animal', 'bonusDice', 'Animal Feature', 'athletics', 'scene'); location.reload();\">Activate</button> Tail</td><td>2</td><td>+##Animal to Athletics rolls</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['claws'] == true) {afTable += "<tr><td><button onclick=\"addNewTempModifier('#animal', 'bonusDice', 'Animal Feature', 'damagerolls', 'scene'); location.reload();\">Activate</button> Claws</td><td>2</td><td>+##Animal to Damage rolls</td></tr>";}
								if(genExceptionsMasterList['animalFeature'][myCharacter['selfName']]['scalesShellThickHide'] == true) {afTable += "<tr><td><button onclick=\"addNewTempModifier('#animal', 'bonusDice', 'Animal Feature', 'soak', 'scene'); location.reload();\">Activate</button> Scales/Shell/Thick Hide</td><td>2</td><td>+##Animal to Soak</td></tr>";}
								afTable += "</table>";
								powerString = powerString.replace("##AnimalFeatureTable", afTable);
							}
						}
						tlamatiliztliString = "Conviction: +" + convertToEpic(myCharacter['virtues']['conviction']) + " Dice<br>Courage: +" + convertToEpic(myCharacter['virtues']['courage']) + " Dice<br>Duty: +" + convertToEpic(myCharacter['virtues']['duty']) + " Dice<br>Loyalty: +" + convertToEpic(myCharacter['virtues']['loyalty']) + " Dice";
						powerString = powerString.replace(/##Tlamatiliztli/g, tlamatiliztliString);
						nonSequiturListString = "<br> 1. ";
						nonSequiturListString += "You and your allies are afflicted with a -##Chaos die penalty for the rest of the scene (everyone apply this manually - sorry guys).<br> 2. An enemy of the Storyteller's choice gains +##Chaos bonus dice to all actions for the rest of the scene (have the Storyteller apply this manually).<br> 3. You and your allies each lose a Legendary Deed or suffer (Legend) unsoakable Aggravated damage if one cannot be lost.<br> 4. You and your allies each lose -1/2 ##Chaos points of Legend (or unsoakable Bashing damage if no more Legend can be lost).<br> 5. Everyone present can spend a Legend to reroll a reroll for the rest of the scene.<br> 6. You gain a random flash of insight in the form of a clue or hint from the Storyteller.<br> 7. You and your allies each regain +1/2 ##Chaos points of Legend.<br> 8. You and your allies each regain a spent Legendary Deed or automatically apply one for free to their next action if one cannot be regained.<br> 9. You gain +##Chaos bonus dice to all actions for the rest of the scene (apply this manually).<br> 10. An enemy of your choice suffers a -##Chaos die penalty for the rest of the scene (have the Storyteller apply this manually).";
						powerString = powerString.replace(/##NonSequiturList/g, nonSequiturListString);
						powerString = powerString.replace(/5 x ##WarpSpasmOne/g, parseInt((effectiveNumberWar + myCharacter['virtues']['courage'] + myCharacter['virtues']['valor'] + myCharacter['virtues']['endurance']) * 5));
						powerString = powerString.replace(/##WarpSpasmOne/g, parseInt(effectiveNumberWar + myCharacter['virtues']['courage'] + myCharacter['virtues']['valor'] + myCharacter['virtues']['endurance']));
						powerString = powerString.replace(/##WarpSpasmTwo/g, parseInt(effectiveNumberWar + myCharacter['virtues']['conviction'] + myCharacter['virtues']['expression'] + myCharacter['virtues']['vengeance']));
						powerString = powerString.replace(/##WarpSpasmThree/g, parseInt(effectiveNumberWar + myCharacter['virtues']['duty'] + myCharacter['virtues']['loyalty'] + myCharacter['virtues']['piety']));

						powerString = powerString.replace(/##ColorRed/g, "\"color: #FF0000\"");
						powerString = powerString.replace(/##EpicStrength x 5/g, parseInt(myCharacter['epicAttributes']['epicStrength']) * 5);
						powerString = powerString.replace(/##EpicStrength/g, parseInt(myCharacter['epicAttributes']['epicStrength']));
						powerString = powerString.replace(/##EpicDexterity x 5/g, parseInt(myCharacter['epicAttributes']['epicDexterity']) * 5);
						powerString = powerString.replace(/1\/2 ##EpicDexterity/g, Math.round(parseInt(myCharacter['epicAttributes']['epicDexterity']) / 2));
						powerString = powerString.replace(/##EpicDexterity/g, parseInt(myCharacter['epicAttributes']['epicDexterity']));
						powerString = powerString.replace(/##EpicStamina1\/2/g, Math.round(parseInt(myCharacter['epicAttributes']['epicStamina']) / 2));
						powerString = powerString.replace(/##EpicStamina/g, parseInt(myCharacter['epicAttributes']['epicStamina']));
						powerString = powerString.replace(/##EpicCharismaSuccesses/g, convertToEpic(myCharacter['epicAttributes']['epicCharisma']));
						powerString = powerString.replace(/##EpicCharisma/g, parseInt(myCharacter['epicAttributes']['epicCharisma']));
						powerString = powerString.replace(/30 - ##EpicManipulation/g, (30 - (parseInt(myCharacter['epicAttributes']['epicManipulation']) + parseInt(myCharacter['coreTraits']['legend']) + parseInt(myCharacter['attributes']['manipulation']))));
						powerString = powerString.replace(/##EpicManipulation/g, parseInt(myCharacter['epicAttributes']['epicManipulation']));
						powerString = powerString.replace(/##EpicAppearance/g, parseInt(myCharacter['epicAttributes']['epicAppearance']));
						powerString = powerString.replace(/##EpicPerception/g, parseInt(myCharacter['epicAttributes']['epicPerception']));
						powerString = powerString.replace(/##EpicIntelligence/g, parseInt(myCharacter['epicAttributes']['epicIntelligence']));
						powerString = powerString.replace(/##EpicWits/g, parseInt(myCharacter['epicAttributes']['epicWits']));
						powerString = powerString.replace(/20 - ##Animal/g, 20 - effectiveNumberAnimal);
						powerString = powerString.replace(/1\/2 ##Animal/g, Math.round(effectiveNumberAnimal / 2));
						powerString = powerString.replace(/##Animal/g, effectiveNumberAnimal);
						powerString = powerString.replace(/100 x ##Chaos/g, effectiveNumberChaos * 100);
						powerString = powerString.replace(/10 x ##Chaos/g, effectiveNumberChaos * 10);
						powerString = powerString.replace(/3 x ##Chaos/g, effectiveNumberChaos * 3);
						powerString = powerString.replace(/2 x ##Chaos/g, effectiveNumberChaos * 2);
						powerString = powerString.replace(/1\/2 ##Chaos/g, Math.round(effectiveNumberChaos / 2));
						powerString = powerString.replace(/##Chaos/g, effectiveNumberChaos);
						powerString = powerString.replace(/##Creation/g, effectiveNumberCreation);
						powerString = powerString.replace(/10 x ##Darkness/g, effectiveNumberDarkness * 10);
						powerString = powerString.replace(/2 x ##Darkness/g, effectiveNumberDarkness * 2);
						powerString = powerString.replace(/1\/4 x ##Darkness/g, Math.round(effectiveNumberDarkness / 2));
						powerString = powerString.replace(/20 - ##Darkness/g, 20 - effectiveNumberDarkness);
						powerString = powerString.replace(/##Darkness/g, effectiveNumberDarkness);
						powerString = powerString.replace(/2 x ##Death/g, effectiveNumberDeath * 2);
						powerString = powerString.replace(/##Death/g, effectiveNumberDeath);
						powerString = powerString.replace(/20 - ##Earth/g, 20 - effectiveNumberEarth);
						powerString = powerString.replace(/2 x ##Earth/g, effectiveNumberEarth * 2);
						powerString = powerString.replace(/1\/2 ##Earth/g, Math.round(effectiveNumberEarth / 2));
						powerString = powerString.replace(/##Earth/g, effectiveNumberEarth);
						powerString = powerString.replace(/1\/2 ##Fertility/g, Math.round(effectiveNumberFertility / 2));
						powerString = powerString.replace(/100 x ##Fertility/g, effectiveNumberFertility * 100);
						powerString = powerString.replace(/2 x ##Fertility/g, effectiveNumberFertility * 2);
						powerString = powerString.replace(/##Fertility/g, effectiveNumberFertility);
						powerString = powerString.replace(/20 - ##Fire/g, 20 - effectiveNumberFire);
						powerString = powerString.replace(/10 x ##Fire/g, effectiveNumberFire * 10);
						powerString = powerString.replace(/1\/2 ##Fire/g, Math.round(effectiveNumberFire / 2));
						powerString = powerString.replace(/2 x ##Fire/g, effectiveNumberFire * 2);
						powerString = powerString.replace(/##Fire/g, effectiveNumberFire);
						powerString = powerString.replace(/2 x ##Frost/g, parseInt(effectiveNumberFrost * 2));
						powerString = powerString.replace(/1\/2 ##Frost/g, Math.round(effectiveNumberFrost / 2));
						powerString = powerString.replace(/##Frost/g, effectiveNumberFrost);
						powerString = powerString.replace(/##Guardian x ##Guardian/g, effectiveNumberGuardian * effectiveNumberGuardian);
						powerString = powerString.replace(/1\/2 ##Guardian/g, Math.round(effectiveNumberGuardian / 2));
						powerString = powerString.replace(/5 x ##Guardian/g, effectiveNumberGuardian * 5);
						powerString = powerString.replace(/##Guardian/g, effectiveNumberGuardian);
						powerString = powerString.replace(/5 x ##Health/g, effectiveNumberHealth * 5);
						powerString = powerString.replace(/1\/2 ##Health/g, Math.round(effectiveNumberHealth / 2));
						powerString = powerString.replace(/2 x ##Health/g, effectiveNumberHealth * 2);
						powerString = powerString.replace(/##Health/g, effectiveNumberHealth);
						powerString = powerString.replace(/1\/2 ##Illusion/g, Math.round(effectiveNumberIllusion / 2));
						powerString = powerString.replace(/2 x ##Illusion/g, parseInt(effectiveNumberIllusion * 2));
						powerString = powerString.replace(/50 x ##Illusion/g, effectiveNumberIllusion * 50);
						powerString = powerString.replace(/##Illusion/g, effectiveNumberIllusion);
						powerString = powerString.replace(/3 x ##Justice/g, effectiveNumberJustice * 3);
						powerString = powerString.replace(/1\/2 ##Justice/g, Math.round(effectiveNumberJustice / 2));
						powerString = powerString.replace(/##Justice/g, effectiveNumberJustice);
						powerString = powerString.replace(/1\/2 ##Magic/g, Math.round(effectiveNumberMagic / 2));
						powerString = powerString.replace(/##Magic/g, effectiveNumberMagic);
						powerString = powerString.replace(/##Moon x 100/g, effectiveNumberMoon * 100);
						powerString = powerString.replace(/##Moon x 10/g, effectiveNumberMoon * 10);
						powerString = powerString.replace(/1\/2 ##Moon/g, Math.round(effectiveNumberMoon / 2));
						powerString = powerString.replace(/##Moon/g, effectiveNumberMoon);
						powerString = powerString.replace(/1\/2 ##Mystery/g, Math.round(effectiveNumberMystery / 2));
						powerString = powerString.replace(/##Mystery/g, effectiveNumberMystery);
						powerString = powerString.replace(/5 + ##Prophecy/g, effectiveNumberProphecy + 5);
						powerString = powerString.replace(/1\/2 ##Prophecy/g, Math.round(effectiveNumberProphecy / 2));
						powerString = powerString.replace(/##Prophecy/g, effectiveNumberProphecy);
						powerString = powerString.replace(/100 x ##Psychopomp/g, parseInt(effectiveNumberPsychopomp * 100));
						powerString = powerString.replace(/2 x ##Psychopomp/g, parseInt(effectiveNumberPsychopomp * 2));
						powerString = powerString.replace(/1\/2 ##Psychopomp/g, Math.round(effectiveNumberPsychopomp / 2));
						powerString = powerString.replace(/##Psychopomp/g, effectiveNumberPsychopomp);
						powerString = powerString.replace(/20 - ##Sky/g, 20 - effectiveNumberSky);
						powerString = powerString.replace(/10 x ##Sky/g, effectiveNumberSky * 10);
						powerString = powerString.replace(/1\/2 ##Sky/g, Math.round(effectiveNumberSky / 2));
						powerString = powerString.replace(/##Sky/g, effectiveNumberSky);
						powerString = powerString.replace(/10 x ##Star/g, parseInt(effectiveNumberStar * 10));
						powerString = powerString.replace(/2 x ##Star/g, parseInt(effectiveNumberStar * 2));
						powerString = powerString.replace(/1\/2 ##Star/g, Math.round(effectiveNumberStar / 2));
						powerString = powerString.replace(/##Star/g, effectiveNumberStar);
						powerString = powerString.replace(/##Sun x 100/g, effectiveNumberSun * 100);
						powerString = powerString.replace(/##Sun x 10/g, effectiveNumberSun * 10);
						powerString = powerString.replace(/2 x ##Sun/g, effectiveNumberSun * 2);
						powerString = powerString.replace(/1\/2 ##Sun/g, Math.round(effectiveNumberSun / 2));
						powerString = powerString.replace(/##Sun/g, effectiveNumberSun);
						powerString = powerString.replace(/5 x ##Thunder/g, effectiveNumberThunder * 5);
						powerString = powerString.replace(/3 x ##Thunder/g, effectiveNumberThunder * 3);
						powerString = powerString.replace(/2 x ##Thunder/g, effectiveNumberThunder * 2);
						powerString = powerString.replace(/##Thunder/g, effectiveNumberThunder);
						powerString = powerString.replace(/1\/2 ##War/g, Math.round(effectiveNumberWar / 2));
						powerString = powerString.replace(/##War/g, effectiveNumberWar);
						powerString = powerString.replace(/20 - ##Water/g, 20 - effectiveNumberWater);
						powerString = powerString.replace(/1\/2 ##Water/g, Math.round(effectiveNumberWater / 2));
						powerString = powerString.replace(/1\/4 ##Water/g, Math.round(effectiveNumberWater / 4));
						powerString = powerString.replace(/2 x ##Water/g, effectiveNumberWater * 2);
						powerString = powerString.replace(/Epic x ##Water/g, convertToEpic(effectiveNumberWater));
						powerString = powerString.replace(/##Water/g, effectiveNumberWater);
						powerString = powerString.replace(/1\/2 ##Legend/g, Math.round(myCharacter['coreTraits']['legend'] / 2));
						powerString = powerString.replace(/##Legend/g, myCharacter['coreTraits']['legend']);
						powerString = powerString.replace(/##Willpower/g, myCharacter['coreTraits']['willpower']);
						powerString = powerString.replace(/##Conviction/g, myCharacter['virtues']['conviction']);
						powerString = powerString.replace(/##Courage/g, myCharacter['virtues']['courage']);
						powerString = powerString.replace(/##Duty/g, myCharacter['virtues']['duty']);
						powerString = powerString.replace(/##DeadHealthLevels/g, adjustedDeadHealthLevels);
						powerString = powerString.replace(/##Academics/g, parseInt(myCharacter['skills']['academics']));
						var virtCounter = 0;
						for(var virtue in myCharacter['virtues']) {
							if(myCharacter['virtues'][virtue] > 0) {
								virtCounter++;
								switch(virtCounter) {
									case 1:
									firstVirtuePlaceholder = virtue;
									break;
									case 2:
									secondVirtuePlaceholder = virtue;
									break;
									case 3:
									thirdVirtuePlaceholder = virtue;
									break;
									case 4:
									fourthVirtuePlaceholder = virtue;
									break;
								}
							}
						}
						powerString = powerString.replace(/##FirstVirtue/g, capitalizeFirstLetter(firstVirtuePlaceholder));
						powerString = powerString.replace(/##SecondVirtue/g, capitalizeFirstLetter(secondVirtuePlaceholder));
						powerString = powerString.replace(/##ThirdVirtue/g, capitalizeFirstLetter(thirdVirtuePlaceholder));
						powerString = powerString.replace(/##FourthVirtue/g, capitalizeFirstLetter(fourthVirtuePlaceholder));
					}
					powerString += "<br>";
					powerString += "</div>";
				}
				powerClassList += powerString;
			}
		}
		document.getElementById(detailsBuilder).innerHTML = powerClassList;
	}



	for(var powerClass in powerMasterList) {
		if(powerClass.indexOf("epic") > -1) {
			classBuilder = "knacks";
		} else {
			classBuilder = "boons";
		}
		for(var powerName in powerMasterList[powerClass]) {
			powerReplacedBy = powerMasterList[powerClass][powerName]['replacedBy'];
			if(myCharacter[classBuilder][powerClass][powerReplacedBy] == true) {
				var dElement = powerName + "Div";
				var dClass = document.getElementById(dElement);
				dClass.className = dClass.className + " displayNone";
			}
		}
	}


}
