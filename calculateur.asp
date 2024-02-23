<?xml version="1.0" encoding="utf-8" ?>
	
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

	<title>Nomination Stagiaire - Echelle C1</title>
	<link rel="stylesheet" href="etp.css" media="all" />
	<script type="text/javascript">var echelle=3;</script>
	<script src="etp.js" type="text/javascript"></script>

</head>

<body onload="javascript:data_reset();">

<center>
<a href="http://www.cdg71.fr"><img style="border:none;" src="../images/logo.jpg" /></a>
<h1>Nomination Stagiaire - Echelle C1</h1>
<h2>Assistant de calcul de la reprise d'ancienneté</h2>
<p>Pour revenir à la page d'accueil de l'assistant, <a href="https://www.cdg71.fr/index.php/ressources-humaines/gestion-des-carrieres/le-recrutement#en-qualite-de-fonctionnaire-stagiaire-et-titulaire" onclick="if (window.confirm('Attention, la simulation en cours sera perdue.\nCliquez sur OK pour revenir à la page d\'accueil de l\'assistant.')) {return true;} else {return false;}">cliquez ici</a>.</p>
<table border="0" cellpadding="5" cellspacing="6" width="700">
	<tr><td class="prive_bord" align="center" valign="top">

		<!-- SITUATIONS DANS LE PRIVE -->
		<table border="0" cellpadding="0" cellspacing="3" width="350" class="bord"><tr><td align="center" valign="middle" height="50px" style="color: #1e90ff"><b>Services accomplis en tant que :<br />salarié privé, salarié associatif<br />ou agent de droit privé d'une administration</b></td></tr></table>
		<table border="0" cellpadding="0" cellspacing="3" width="350" class="bord">
			<tr><td style="text-align:justify">Pour ajouter un service, remplissez le formulaire ci-dessous puis cliquez sur ajouter. Recommencez pour ajouter plusieurs services.<hr /></td></tr>
			<tr><td align="left"><b>Durée du service : </b></td></tr>
			<tr><td align="center"><input id="pr_annees" name="pr_annees" type="text" size="2" maxlength="5" /> ans, <input id="pr_mois" name="pr_mois" type="text" size="2" maxlength="5" /> mois et <input id="pr_jours" name="pr_jours" type="text" size="2" maxlength="5" /> jours.</td></tr>
			<tr><td align="left"><b>Temps de travail effectif : <b/></td></tr>
			<tr><td align="center"><input id="pr_tpartiel" name="pr_tpartiel" type="text" size="2" maxlength="5" /> heures/semaines.</td></tr>
			<tr><td align="left"><b>Durée du travail à temps plein : <b/></tr>
			<tr></td><td align="center"><input id="pr_tplein" name="pr_tplein" type="text" size="2" maxlength="5" /> heures/semaines.</td></tr>
			<tr><td valign="top" align="center"><button class="prive_bouton" onclick="javascript:ajouter_etp('pr_');">Ajouter</button></td></tr>
		</table>
		<table border="0" cellpadding="0" cellspacing="3" width="350" class="bord">
			<tr><td id="pr_resultat" name="pr_resultat">
				<center>
					<span id="pr_final" name="pr_final" style="color: #1e90ff"><hr class="prive" /><b>Aucun service</b><hr class="prive" /></span>
					<!--<span id="pr_echelon" name="pr_echelon" style="color: #1e90ff">Cette durée donne droit à un classement au <b>1er échelon</b> du grade considéré.<hr class="prive" /><input type="hidden" name="pr_valEchelon" id="pr_valEchelon" value="1" /></span>-->
				</center>
			</td></tr>
		</table>

	</td><td class="public_bord" align="center" valign="top">

		<!-- SITUATIONS DANS LE PUBLIC -->
		<table border="0" cellpadding="0" cellspacing="3" width="350" class="bord"><tr><td align="center" valign="middle" height="50px" style="color: #ff6600"><b>Services accomplis en tant que :<br />agent public</b></td></tr></table>
		<table border="0" cellpadding="0" cellspacing="3" width="350" class="bord">
			<tr><td style="text-align:justify">Pour ajouter un service, remplissez le formulaire ci-dessous puis cliquez sur ajouter. Recommencez pour ajouter plusieurs services.<hr /></td></tr>
			<tr><td align="left"><b>Durée du service : </b></td></tr>
			<tr><td align="center"><input id="pu_annees" name="pu_annees" type="text" size="2" maxlength="5" /> ans, <input id="pu_mois" name="pu_mois" type="text" size="2" maxlength="5" /> mois et <input id="pu_jours" name="pu_jours" type="text" size="2" maxlength="5" /> jours.</td></tr>
			<tr><td align="left"><b>Temps de travail effectif : <b/></td></tr>
			<tr><td align="center"><input id="pu_tpartiel" name="pu_tpartiel" type="text" size="2" maxlength="5" /> heures/semaines.</td></tr>
			<tr><td align="left"><b>Durée du travail à temps plein : <b/></tr>
			<tr></td><td align="center"><input id="pu_tplein" name="pu_tplein" type="text" size="2" maxlength="5" /> heures/semaines.</td></tr>
			<tr><td valign="top" align="center"><button class="public_bouton" onclick="javascript:ajouter_etp('pu_');">Ajouter</button></td></tr>
		</table>
		<table border="0" cellpadding="0" cellspacing="3" width="350" class="bord">
			<tr><td id="pu_resultat" name="pu_resultat">
				<center>
					<span id="pu_final" name="pu_final" style="color: #ff6600"><hr class="public" /><b>Aucun service</b><hr class="public" /></span>
					<!--<span id="pu_echelon" name="pu_echelon" style="color: #ff6600">Cette durée donne droit à un classement au <b>1er échelon</b> du grade considéré.<hr class="public" /><input type="hidden" name="pu_valEchelon" id="pu_valEchelon" value="1" /></span>-->
				</center>
			</td></tr>
		</table>
	</tr></td>
</table>
<table border="0" cellpadding="0" cellspacing="6" width="730" class="bord">
	<tr><td valign="top" align="left" id="resultat_final" name="resultat_final">
	</td></tr>
	<tr><td valign="top" align="left">
      <hr>
      <b>Attention</b> : lors de la rédaction de votre projet d'arrêté, n'oubliez pas de rajouter, le cas échéant, les périodes de <b>services militaires</b> au résultat obtenu dans ce calculateur.
	</td></tr>
</table>
<br />Pour revenir à la page d'accueil de l'assistant, <a href="https://www.cdg71.fr/index.php/ressources-humaines/gestion-des-carrieres/le-recrutement#en-qualite-de-fonctionnaire-stagiaire-et-titulaire" onclick="if (window.confirm('Attention, la simulation en cours sera perdue.\nCliquez sur OK pour revenir à la page d\'accueil de l\'assistant.')) {return true;} else {return false;}">cliquez ici</a>.
<% Server.execute("footer.asp") %>
</center>
<form>
<input type ="hidden" value="0" name="sm_total" id="sm_total" />
<input type ="hidden" value="0" name="pr_total" id="pr_total" />
<input type ="hidden" value="0" name="pu_total" id="pu_total" />
</form>
</body>

</html>