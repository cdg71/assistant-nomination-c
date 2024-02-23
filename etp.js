/****************************************************************************/
/**																																				 **/
/**  FONCTIONS POUR LE GENERATEUR D'ARRETES DE NOMINATION STAGIAIRE CAT C  **/
/**                                                                        **/
/****************************************************************************/

var idligne = 0;

/*** Ecrire les ans/mois/jours correctement ***/
function ecrire(annees, mois, jours) {
	var chaine = "";
	// Années
	if (annees==1) chaine = chaine + annees + " an";
	if (annees>1) chaine = chaine + annees + " ans";
	// Mois
	if (mois>=1) {
		if (annees != 0 && jours == 0) chaine = chaine + " et ";
		if (annees != 0 && jours != 0) chaine = chaine + ", ";
		chaine = chaine  + mois + " mois";
	}
	// Jours
	if (jours>=1) {
		if (annees != 0 || mois != 0) chaine = chaine + " et ";
		if (jours==1) chaine = chaine + jours + " jour";
		if (jours>1) chaine = chaine + jours + " jours";
	}
	//Retour de variable
	return chaine;
}

/*** Ajouter un service dans la bonne colonne ***/
function ajouter_etp(type_service) {
	var annees = Math.abs(Number(document.getElementById(type_service + "annees").value));
	var mois = Math.abs(Number(document.getElementById(type_service + "mois").value));
	var jours = Math.abs(Number(document.getElementById(type_service + "jours").value));
	var tpartiel = Math.abs(Number(document.getElementById(type_service + "tpartiel").value));
	var tplein = Math.abs(Number(document.getElementById(type_service + "tplein").value));

	if (isNaN(annees) || isNaN(mois) || isNaN(jours) || isNaN(tpartiel) || isNaN(tplein) || tplein==0 || tpartiel==0 || tpartiel>tplein || (annees<=0 && mois<=0 && jours<=0)) {
		var erreur = "Une ou plusieurs erreurs ont été détectées :";
		erreur = erreur + (isNaN(annees)?"\n- Le nombre d'années saisi est invalide.":"");
		erreur = erreur + (isNaN(mois)?"\n- Le nombre de mois saisi est invalide.":"");
		erreur = erreur + (isNaN(jours)?"\n- Le nombre de jours saisi est invalide.":"");
		erreur = erreur + (((annees<=0 && mois<=0 && jours<=0))?"\n- La durée de service indiquée est nulle.":"");
		erreur = erreur + ((isNaN(tpartiel) || tpartiel<=0)?"\n- Le temps de travail effectif est invalide ou égal à zéro.":"");
		erreur = erreur + ((isNaN(tplein) || tplein<=0)?"\n- La durée du temps plein est invalide ou égale à zéro.":"");
		erreur = erreur + ((tpartiel>tplein)?"\n- Le temps de travail effectif est supérieur à la durée du temps plein.":"");
		alert(erreur);
	} else {
		if (tplein != tpartiel) {
			var chaine = ecrire(annees, mois, jours) + " à " + tpartiel + "/" + tplein + "ème";
			var resultat = Math.round(((jours + (mois*30) + (annees*360))*tpartiel)/tplein);
			annees = Math.floor(resultat/360);
			mois = Math.floor(resultat/30) - (annees*12);
			jours = resultat - (mois*30) - (annees*360);
			chaine = chaine + " convertis en équivalent temps plein à " + ecrire(annees, mois, jours) + ".";
		} else {
			var chaine = ecrire(annees, mois, jours) + " à temps plein (" + tpartiel + "/" + tplein + "ème).";
			var resultat = Math.round(jours + (mois*30) + (annees*360));
		}

		//Ajout de la ligne dans la colonne concernée
		document.getElementById(type_service + "resultat").innerHTML = "<span id='" + idligne + "' name='"+ idligne +"'>" + chaine + " (<a class=\"" + type_service + "link\" href=\"javascript:supprimer_etp('" + type_service + "', " + resultat + ", '" + (idligne++) + "');\">supprimer</a>)<hr /></span>" + document.getElementById(type_service + "resultat").innerHTML;

		//MàJ du Total et comparaison
		total_etp(resultat, type_service);

		//Effacer le formulaire
		document.getElementById(type_service + "annees").value = "";
		document.getElementById(type_service + "mois").value = "";
		document.getElementById(type_service + "jours").value = "";
		document.getElementById(type_service + "tpartiel").value = "";
		document.getElementById(type_service + "tplein").value = "";
	}
}

/*** Supprimer un service ***/
function supprimer_etp(type_service, resultat, idligne) {

	//Supression de la ligne dans la colonne concernée
	document.getElementById(idligne).innerHTML = "";
	//MàJ du Total et comparaison
	total_etp(-resultat, type_service);
}

/*** Calcul de temps total passé au titre d'un service particulier ***/
function total_etp(nbjours, type_service) {

	//mise à jour de la variable stockée
	var resultat = nbjours + Number(document.getElementById(type_service + "total").value);
	document.getElementById(type_service + "total").value = resultat;
	var quotient = ((type_service == "pr_")?0.5:0.75);

	//avant l'abattement
	var annees = Math.floor(resultat/360);
	var mois = Math.floor(resultat/30) - (annees*12);
	var jours = resultat - (mois*30) - (annees*360);
	var chaine = "<hr class='" + ((type_service == "pr_")?"prive":"public") + "' /><b>Total retenu :</b><br />" + ((quotient==0.5)?"La moitié":"Les trois quarts") + " de " + ecrire(annees, mois, jours) + ",<br />soit<br /><b>";

	//après l'abattement
	resultat = Math.round(quotient*resultat);
	annees = Math.floor(resultat/360);
	mois = Math.floor(resultat/30) - (annees*12);
	jours = resultat - (mois*30) - (annees*360);
	chaine = chaine + ecrire(annees, mois, jours) + "</b>.<hr class='" + ((type_service == "pr_")?"prive":"public") + "' />";

	//identification de l'échelon correspondant aux différents types de services et màj de la colonne.
	affi_Grade(resultat, Number(document.getElementById("sm_total").value), type_service, chaine);

	//Comparaison des types de services
	var pr_echelon = 0.50*Number(document.getElementById("pr_total").value);
	var pu_echelon = 0.75*Number(document.getElementById("pu_total").value);
	var chaine = "<b>Résultat de la simulation</b> :<br />"

	if (pr_echelon > pu_echelon) chaine = chaine + "Les services accomplis en tant que salarié privé, salarié associatif ou agent de droit privé d'une administration sont les plus favorables à l'agent.";
	if (pr_echelon == pu_echelon) chaine = chaine + "Les deux types de services sont équivalents.";
	if (pr_echelon < pu_echelon) chaine = chaine + "Les services accomplis en tant qu'agent public sont les plus favorables à l'agent.";

	document.getElementById("resultat_final").innerHTML = chaine;
}
/*** Mettre à jour l'affichage du grade dans la ligne concernée ***/
function affi_Grade(service, sm_total, type_service, chaine) {
	//identification de l'échelon
	var echelon = 1;
	var reliquat = 0;
	var resultat = service + sm_total;
	//avant réforme 01/2007
	//var EchMaxi = new Array(0, 360, 1080, 1800, 2880, 3960, 5040, 6480, 7920, 9360);
	//for(i=0; i<10; i++) {
	//après réforme 01/2007
	//var EchMaxi = new Array(0, 360, 1080, 1800, 2880, 3960, 5040, 6480, 7920, 9360, 10800);
	//for(i=0; i<11; i++) {
	//après réforme 01/2007
   if (echelle == 3 ) {
      echelonMax = 11;
   } else {
      echelonMax = 12;
   }
	var EchMaxi = new Array(0, 360, 720, 1440, 2160, 2880, 3600, 4320, 5400, 6480, 7920, 9360);
	for(i=0; i<echelonMax; i++) {
		if (resultat >= EchMaxi[i]) {
			echelon = i+1;
			reliquat = resultat - EchMaxi[i];
			reliquat_annees = Math.floor(reliquat/360);
			reliquat_mois = Math.floor(reliquat/30) - (reliquat_annees*12);
			reliquat_jours = reliquat - (reliquat_mois*30) - (reliquat_annees*360);
		}
	}

	//Ajout de la ligne dans la colonne concernée
	if (service!=0) {
		document.getElementById(type_service + "final").innerHTML = chaine;
	} else {
		document.getElementById(type_service + "final").innerHTML = "<hr class='" + ((type_service == "pr_")?"prive":"public") + "' /><b>Aucun service</b><hr class='" + ((type_service == "pr_")?"prive":"public") + "' />";
	}
	if (resultat!=0) {
		document.getElementById(type_service + "echelon").innerHTML = "Ajoutée aux éventuels services militaires, cette durée donne droit à un classement au <b>" + ((echelon==1)?echelon + "er": echelon + "ème") + " échelon</b> du grade considéré" + ((reliquat != 0)?" avec un reliquat d'ancienneté de " + ecrire(reliquat_annees, reliquat_mois, reliquat_jours) + ".":".") + "<input type=\"hidden\" name=\"" + type_service + "valEchelon\" id=\"" + type_service + "valEchelon\" value=\"" + echelon + "\" /><hr class='" + ((type_service == "pr_")?"prive":"public") + "' />";
	} else {
		document.getElementById(type_service + "echelon").innerHTML = "Ajoutée aux éventuels services militaires, cette durée donne droit à un classement au <b>1er échelon</b> du grade considéré.<input type=\"hidden\" name=\"" + type_service + "valEchelon\" id=\"" + type_service + "valEchelon\" value=\"" + echelon + "\" /><hr class='" + ((type_service == "pr_")?"prive":"public") + "' />";
	}
}

/*** Saisir la période de services militaires ***/
function confirmer_sm(){
	var alerte;
	var valide = 1;
	var resultat;
	var annees = Math.abs(Number(document.getElementById("sm_annees").value));
	var mois = Math.abs(Number(document.getElementById("sm_mois").value));
	var jours = Math.abs(Number(document.getElementById("sm_jours").value));

	if (isNaN(annees) || isNaN(mois) || isNaN(jours)) {
		valide = 0;
		alerte = "Une ou plusieurs erreurs ont été détectées :";
		alerte = alerte + (isNaN(annees)?"\n- Le nombre d'années saisi est invalide.":"");
		alerte = alerte + (isNaN(mois)?"\n- Le nombre de mois saisi est invalide.":"");
		alerte = alerte + (isNaN(jours)?"\n- Le nombre de jours saisi est invalide.":"");
	} else {
		resultat = Math.round(jours + (mois*30) + (annees*360));
		if (resultat > 3600) {
			valide = 2;
			resultat = 3600;
			alerte="La durée indiquée est supérieure à 10 ans. La période de services militaires retenue par le simulateur sera de 10 ans.\nCliquez sur OK pour confirmer.";
		}
	}

	//Evaluation du résultat et poursuite
	switch (valide) {
		case 0 :
			alert(alerte);
 			document.getElementById("sm_annees").focus();
 			return false;
 			break;
		case 1 :
			document.getElementById("sm_total").value = resultat;
			return true;
			break;
		case 2 :
			if (window.confirm(alerte)) {
				document.getElementById("sm_total").value = resultat;
				return true;
			} else {
				return false;
			}
			break;
	}
}

/*********************************************/
/**																				  **/
/**  FONCTIONS DE CONTROLE DES FORMULAIRES  **/
/**                                         **/
/*********************************************/

function data_reset(){
	if ((document.getElementById("pr_total").value != 0) || (document.getElementById("pu_total").value != 0)) {
		window.location.reload();
	} else {
		//identification de l'échelon correspondant aux différents types de services et initialisation de l'affichage.
			affi_Grade(0, Number(document.getElementById("sm_total").value), "pu_", "<hr class=\"public\" /><b>Aucun service</b><hr class=\"public\" />");
			affi_Grade(0, Number(document.getElementById("sm_total").value), "pr_", "<hr class=\"prive\" /><b>Aucun service</b><hr class=\"prive\" />");
	}
}

function checksubmit_index(){
 var alerte;
 var valide = 1;

 if (document.getElementById("select_grade").selectedIndex == 0)
 {
  alerte = "Avant de générer un projet d'arrêté, vous devez choisir un grade.";
  valide = 0;
 }

 if (valide==0)
 {
 	alert(alerte+"\n");
 	document.getElementById("select_grade").focus();
  return false;
 }
 else
 {
  return true;
 }
}

function tctnc(){
if (document.getElementById("TC_TNC").selectedIndex == 1)
	document.getElementById("duree").value = "35";
else
	document.getElementById("duree").value = "";
}
