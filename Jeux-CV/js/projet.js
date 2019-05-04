"use strict"

//*********************************************************************
//********************** Chrono + accueil *****************************
//*********************************************************************

var chrono = "";
var m = 0;
var s = 30;
var ms = 99;

window.status = "chronos" + m + ":" + s + ":" + ms;

var chronos = function () {

    var monChrono = document.getElementById("formu")
    monChrono.style.bottom = "-700px";

    //*********** Pour mettre un bouton "Stop" + "Reprise" sous le chrono *****************

    // var boutonStop = document.getElementById("btStop") 
    // $("#btStop").fadeIn(3000);
    // $("#btReprise").fadeIn(3000);
    //*************************************************************************************

    $("#brume").fadeOut(2000);
    $("#cv").css("marginTop", "-10px");
    $("#monTitre").fadeOut(0);
    $("#btStart").fadeOut(0);
    $("#p3").fadeOut(0);
    $("#menu1").css("top", "-700px");
    $("#mission").fadeOut(0);
    $("#btReset").fadeIn(3000);
    $("#heure").fadeIn(3000);
    $("#heure1").fadeIn(3000);
    $("#heure1").css("marginTop", "-55px");
    $("#perso").fadeIn(3000);
    $("#picto").fadeIn(3000);

    if (m == 0) {
        m = "00";
    }
    if (s == 0) {
        s = "00";
    }
    if (ms < 10) {
        ms = "0" + ms;
    };

    window.status = "chronos" + m + ":" + s + ":" + ms;
    document.formu.heure.value = m + ":" + s + ":" + ms;

    ms--;

    if (ms == 0) {
        ms = 99;
        s--;
        if (s < 10) {
            s = "0" + s;
        };
    }
    if (s == 0) {
        ms = 0;
        clearTimeout(chrono);
        $("#photo1").fadeIn(3000);
        $("#perso").css("display", "none");

        if (m < 10) {
            m = "0" + m;
        };
    }
    if (m == 0) {
        m = "0" + 0;
    };

    chrono = window.setTimeout("chronos()", 10);
};
//********************** Fin chrono + accueil *****************************

window.addEventListener("DOMContentLoaded", function () {

    $("body").css("visibility", "visible"); //***** supprimer effet flicker au demarrage *****

    var bouton = document.querySelector("button");
    bouton.addEventListener("click", function(){

        $("#container3").fadeIn(3000); // au clic sur START, le canon apparait.
        $("#container4").fadeIn(3000); // au clic sur START, le boulet apparait.
        $("#container5").fadeIn(3000); // au clic sur START, explosion apparait.
        $("#container6").fadeIn(2000); // au clic sur START, les nuages 1 apparaissent.
        $("#container7").fadeIn(2000); // au clic sur START, les nuages 2 apparaissent.

    });

    //********************************************************
    //******************* Nuages *****************************
    //********************************************************

    var masqueNuages = document.getElementById("container6")
    masqueNuages.style.position = "absolute";
    masqueNuages.style.overflow = "hidden";
    masqueNuages.style.height = "238px";
    masqueNuages.style.width = "1920px";
    masqueNuages.style.top = "0px";

    var masqueNuages2 = document.getElementById("container7")
    masqueNuages2.style.position = "absolute";
    masqueNuages2.style.overflow = "hidden";
    masqueNuages2.style.height = "110px";
    masqueNuages2.style.width = "1920px";
    masqueNuages2.style.top = "0px";

    var nuage = document.getElementById("nuages");
    nuage.style.position = "absolute";
    nuage.style.right = "0px";
    nuage.style.top = "0px";

    window.setInterval(function () {

        var vLaLesNuages = parseFloat(nuage.style.right);
        vLaLesNuages -= 1;
        nuage.style.right = vLaLesNuages + "px";

        if (vLaLesNuages < -4100) {
            nuage.style.right = "0px";
        };
    }, 60); //****** vitesse des nuages 1er plan ******

    var nuage2 = document.getElementById("nuages2");
    nuage2.style.position = "absolute";
    nuage2.style.right = "0px";
    nuage2.style.top = "0px";

    window.setInterval(function () {

        $("#menu1:hover").css("opacity", "1");// menu visible en passant la souris.

        var vLaLesNuages2 = parseFloat(nuage2.style.right);
        vLaLesNuages2 -= 1;
        nuage2.style.right = vLaLesNuages2 + "px";

        if (vLaLesNuages2 < -3000) {
            nuage2.style.right = "0px";
        };
    }, 150); //****** vitesse des nuages 2eme plan ******
    //***************** Fin nuages ***************************

    //********************************************************
    //**************** Chuttes d'eau *************************
    //********************************************************

    var masque1 = document.getElementById("container1");
    masque1.style.position = "absolute";
    masque1.style.overflow = "hidden";
    masque1.style.height = "100px";
    masque1.style.width = "56px";
    masque1.style.top = "658px";
    masque1.style.left = "1264px";

    var sprite1 = document.getElementById("chutteDEau1");
    sprite1.style.position = "absolute";
    sprite1.style.left = "-1px";

    var cParti1 = window.setInterval(function () {

        var saut1 = parseFloat(sprite1.style.left);
        saut1 -= 63;
        sprite1.style.left = saut1 + "px";

        if (saut1 < -189) {
            sprite1.style.left = "0px";
        };
    }, 100); //****** chutte d'eau de gauche ******

    var masque2 = document.getElementById("container2");
    masque2.style.position = "absolute";
    masque2.style.overflow = "hidden";
    masque2.style.height = "100px";
    masque2.style.width = "53px";
    masque2.style.top = "658px";
    masque2.style.left = "1723px";

    var sprite2 = document.getElementById("chutteDEau2");
    sprite2.style.position = "absolute";
    sprite2.style.left = "-1px";

    var cParti2 = window.setInterval(function () {

        var saut2 = parseFloat(sprite2.style.left);
        saut2 -= 63;
        sprite2.style.left = saut2 + "px";

        if (saut2 < -189) {
            sprite2.style.left = "0px";
        };
    }, 110); //****** chutte d'eau de droite ******
    //******************* FIN Chuttes d'eau ********************

    //**********************************************************
    //************************* Canon **************************
    //**********************************************************

    var masqueCanon = document.getElementById("container3");
    masqueCanon.style.position = "absolute";
    masqueCanon.style.overflow = "hidden";
    masqueCanon.style.height = "60px";
    masqueCanon.style.width = "135px";
    masqueCanon.style.top = "500px";
    masqueCanon.style.left = "1345px";

    var canon = document.getElementById("canon");
    canon.style.position = "absolute";
    canon.style.left = "20px";

    var masqueBoulet = document.getElementById("container4");
    masqueBoulet.style.position = "absolute";
    masqueBoulet.style.height = "34px";
    masqueBoulet.style.width = "48px";
    masqueBoulet.style.top = "507px";
    masqueBoulet.style.left = "1400px";

    var bouletDeCanon = document.getElementById("bouletCanon");
    bouletDeCanon.style.position = "absolute";
    bouletDeCanon.style.display = "none";
    bouletDeCanon.style.left = "0px";

    //****************************************************************************
    //************************* Canon + Boulet + Boom ****************************
    //****************************************************************************

    var masqueBoom = document.getElementById("container5");
    masqueBoom.style.position = "absolute";
    masqueBoom.style.overflow = "hidden";
    masqueBoom.style.height = "128px";
    masqueBoom.style.width = "128px";
    masqueBoom.style.top = "460px";
    masqueBoom.style.left = "530px";

    var boom = document.getElementById("explosion");
    boom.style.position = "absolute";
    boom.style.display = "none";
    boom.style.top = "0px";
    boom.style.left = "128px";

    var modeRafale = window.setInterval(function () {

        bouletDeCanon.style.display = "block";
        var tirAGauche = parseFloat(bouletDeCanon.style.left);
        tirAGauche -= 1; //****** deplacement du boulet en "px" ******
        bouletDeCanon.style.left = tirAGauche + "px";

        if (tirAGauche < -825) {

            //**************************************                  
            //************* explosion **************                  
            //**************************************                  
            var caVaPeter = window.setInterval(function () {

                var detonation = parseFloat(boom.style.left);
                detonation -= 128;
                boom.style.left = detonation + "px";
                boom.style.display = "block";

                if (detonation < -1920) {
                    boom.style.left = "0px";
                    clearInterval(caVaPeter);
                    boom.style.display = "none";
                };
            }, 100); //****** vitesse de l'explosion ******
            //********** fin explosion ***************

            var canon1 = window.setInterval(function () {

                var boulet1 = canon.style.left;
                boulet1 = parseFloat(canon.style.left);
                boulet1 -= 139;
                canon.style.left = boulet1 + "px";

                if (boulet1 < -825) {
                    canon.style.left = "20px";
                    clearInterval(canon1)
                };
            }, 20); //****** vitesse rechargement du canon ******

            bouletDeCanon.style.left = "0px"; // retour à la base du boulet
        };
    }, 5); // vitesse missile
    //*************** Fin Canon + Boulet + Boom ***************************

    //*********************************************************************
    //************************ Personnage *********************************
    //*********************************************************************

    var masque = document.getElementById("container");
    masque.style.position = "absolute";
    masque.style.overflow = "hidden";
    masque.style.height = "60px";
    masque.style.width = "57px";
    masque.style.top = "520px";
    masque.style.left = "100px";

    var sprite = document.getElementById("perso");
    sprite.style.position = "absolute";
    sprite.style.display = "none"; //**** invisible au demarrage *****
    sprite.style.top = "0px";
    sprite.style.left = "0px";

    var cPartiADroite;
    var cPartiEnBas;
    var cPartiAGauche;
    var cPartiEnHaut;

    var animeToi = false;

    window.addEventListener("keydown", function (event) {

        var code = event.keyCode;

        switch (code) {

            //*** Touche ENTRER ***
            case 13: 

                chronos();
                break;

            //******************************************************************        
            //***********************  DROITE  *********************************
            //******************************************************************
            case 39:
            case 68:
    
                if (!animeToi) {
                    cPartiADroite = window.setInterval(function () {

                        $("#menu1").css("opacity", "0.4");

                        sprite.style.top = "0px";
                        var changementDeSprite = parseFloat(sprite.style.left);
                        var decaleToiADroite = parseFloat(masque.style.left);
                        changementDeSprite -= 55;
                        sprite.style.left = changementDeSprite + "px";
                        masque.style.left = decaleToiADroite + 10 + "px";

                        if (changementDeSprite < -176) {
                            sprite.style.left = "0px";
                        };
                    }, 100); //****** vitesse de deplacement ******
                    animeToi = true;
                };
                break;

            //******************************************************************          
            //************************  BAS  ***********************************
            //******************************************************************
            case 40:
            case 83:

                if (!animeToi) {
                    cPartiEnBas = window.setInterval(function () {

                        sprite.style.top = "-180px";
                        var changementDeSprite = parseFloat(sprite.style.left);
                        var decaleToiEnBas = parseFloat(masque.style.top);
                        changementDeSprite -= 55;
                        sprite.style.left = changementDeSprite + "px";
                        masque.style.top = decaleToiEnBas + 5 + "px";

                        if (changementDeSprite < -120) {
                            sprite.style.left = "0px";
                        };
                    }, 80); //****** vitesse de deplacement ******
                    animeToi = true;
                };
                break;

            //******************************************************************
            //**********************  GAUCHE  **********************************
            //******************************************************************
            case 37:
            case 81:

                if (!animeToi) {
                    cPartiAGauche = window.setInterval(function () {

                        sprite.style.top = "-60px";
                        var changementDeSprite = parseFloat(sprite.style.left);
                        var decaleToiAGauche = parseFloat(masque.style.left);
                        changementDeSprite -= 55;
                        sprite.style.left = changementDeSprite + "px";
                        masque.style.left = decaleToiAGauche + -10 + "px";

                        if (changementDeSprite < -120) {
                            sprite.style.left = "0px";
                        };
                    }, 100); //****** vitesse de deplacement ******
                    animeToi = true;
                };
                break;

            //*************************************************************
            //***********************  HAUT  ******************************
            //*************************************************************
            case 38:
            case 90:

                if (!animeToi) {
                    cPartiEnHaut = window.setInterval(function () {

                        sprite.style.top = "-120px";
                        var changementDeSprite = parseFloat(sprite.style.left);
                        var decaleToiEnHaut = parseFloat(masque.style.top);
                        changementDeSprite -= 55;
                        sprite.style.left = changementDeSprite + "px";
                        masque.style.top = decaleToiEnHaut + -5 + "px";

                        if (changementDeSprite < -120) {
                            sprite.style.left = "0px";
                        };
                    }, 80); //****** vitesse de deplacement ******
                    animeToi = true;
                };
                break;
        };

        //*********** Sortie d'ecran ***********
        // A gauche
        if (parseFloat(masque.style.left) <= 0) {
            clearInterval(cPartiAGauche);
            masque.style.left = "0px";
        };

        // En bas
        if (parseFloat(masque.style.top) >= 600) {
            clearInterval(cPartiEnBas);
            masque.style.top = "600px";
        };

        // A droite
        if (parseFloat(masque.style.left) >= 1860) {
            clearInterval(cPartiADroite);
            masque.style.left = "1860px";
        };

        // En haut
        if (parseFloat(masque.style.top) <= 475) {
            clearInterval(cPartiEnHaut);
            masque.style.top = "475px";
        };
        //******** FIN sortie d'ecran ************

        //***************************************************************************
        //************************ OBSTACLES a contourner ***************************
        //***************************************************************************

        //*** Arrivee devant recruteur ***
        if (parseFloat(masque.style.left) > 1795) {
            clearInterval(cPartiAGauche);
            clearInterval(cPartiEnBas);
            clearInterval(cPartiADroite);
            clearInterval(cPartiEnHaut);
            clearInterval(modeRafale);
            sprite.style.top = "-120px";
            clearTimeout(chrono);
            $("#photo").fadeIn(4000);
            $("#menu1").css("opacity", "1");// menu visible.
        };

        //*** Riviere de droite ***
        if ((parseFloat(masque.style.left) + 57 >= 1720) && (parseFloat(masque.style.top) + 60 <= 620)) {
            clearInterval(cPartiADroite);
        };
        if ((parseFloat(masque.style.left) + 50 >= 1720) && (parseFloat(masque.style.top) + 60 <= 630)) {
            clearInterval(cPartiEnHaut);
        };

        //*** Canon + gros rocher ***
        if ((parseFloat(masque.style.left) + 57 >= 1407) && (parseFloat(masque.style.top) <= 510)) {
            clearInterval(cPartiADroite);
        };
        if ((parseFloat(masque.style.left) >= 1380) && (parseFloat(masque.style.top) <= 520)) {
            clearInterval(cPartiEnHaut);
        };

        //*** Riviere de gauche ***
        if ((parseFloat(masque.style.left) + 57 >= 1260) && (parseFloat(masque.style.left) <= 1280) && (parseFloat(masque.style.top) + 40 >= 555)) {
            clearInterval(cPartiADroite);
        };
        if ((parseFloat(masque.style.left) >= 1240) && (parseFloat(masque.style.left) <= 1300) && (parseFloat(masque.style.top) + 60 >= 555)) {
            clearInterval(cPartiEnBas);
        };
        if ((parseFloat(masque.style.left) >= 1240) && (parseFloat(masque.style.left) <= 1320) && (parseFloat(masque.style.top) + 40 >= 555)) {
            clearInterval(cPartiAGauche);
        };

        //*** Rocher jQuery ***
        if ((parseFloat(masque.style.left) + 57 >= 1000) && (parseFloat(masque.style.left) <= 1055) && (parseFloat(masque.style.top) >= 530)) {
            clearInterval(cPartiADroite);
        };
        if ((parseFloat(masque.style.left) + 55 >= 1025) && (parseFloat(masque.style.left) <= 1075) && (parseFloat(masque.style.top) >= 520)) {
            clearInterval(cPartiEnBas);
        };
        if ((parseFloat(masque.style.left) >= 1025) && (parseFloat(masque.style.left) <= 1090) && (parseFloat(masque.style.top) >= 530)) {
            clearInterval(cPartiAGauche);
        };

        //*** Rocher jS ***
        if ((parseFloat(masque.style.left) + 57 >= 710) && (parseFloat(masque.style.left) <= 750) && (parseFloat(masque.style.top) >= 530)) {
            clearInterval(cPartiADroite);
        };
        if ((parseFloat(masque.style.left) + 55 >= 720) && (parseFloat(masque.style.left) <= 780) && (parseFloat(masque.style.top) >= 520)) {
            clearInterval(cPartiEnBas);
        };
        if ((parseFloat(masque.style.left) >= 750) && (parseFloat(masque.style.left) <= 790) && (parseFloat(masque.style.top) >= 530)) {
            clearInterval(cPartiAGauche);
        };

        //*** Rocher css ***
        if ((parseFloat(masque.style.left) + 57 >= 500) && (parseFloat(masque.style.left) <= 500) && (parseFloat(masque.style.top) <= 520)) {
            clearInterval(cPartiADroite);
        };
        if ((parseFloat(masque.style.left) + 55 >= 520) && (parseFloat(masque.style.left) <= 580) && (parseFloat(masque.style.top) <= 520)) {
            clearInterval(cPartiEnHaut);
        };
        if ((parseFloat(masque.style.left) >= 500) && (parseFloat(masque.style.left) <= 590) && (parseFloat(masque.style.top) <= 520)) {
            clearInterval(cPartiAGauche);
        };
        //*****************************************************************************
        //******************************* FIN OBSTACLES *******************************
        //*****************************************************************************
    });

    window.addEventListener("keyup", function (event) {

        var code = event.keyCode;

        switch (code) {

            case 39:
            case 68: // A droite
                sprite.style.left = "0px";
                window.clearInterval(cPartiADroite);
                animeToi = false;
                break;

            case 40:
            case 83: // En bas
                sprite.style.left = "0px";
                window.clearInterval(cPartiEnBas);
                animeToi = false;
                break;

            case 37:
            case 81: // A gauche
                sprite.style.left = "0px";
                window.clearInterval(cPartiAGauche);
                animeToi = false;
                break;

            case 38:
            case 90: // En haut
                sprite.style.left = "0px";
                window.clearInterval(cPartiEnHaut);
                animeToi = false;
                break;
        };
    });

    //*****************************************************************************
    //*********************** Collision boulet de canon ****************************  
    //*****************************************************************************

    var animeToi1 = false;

    window.setInterval(function () {

        if (!animeToi1) {

            if ((-1340 + (parseFloat(masque.style.left))) >= (parseFloat(bouletDeCanon.style.left)) && (-1340 + (parseFloat(masque.style.left))) <= (parseFloat(bouletDeCanon.style.left)) + 50 && (parseFloat(masque.style.top)) <= 525) {

                $("#bouletCanon").fadeOut(100);
                clearInterval(chrono);
                clearInterval(modeRafale);
                clearInterval(cPartiADroite);
                clearInterval(cPartiEnBas);
                clearInterval(cPartiAGauche);
                clearInterval(cPartiEnHaut);
                $("#perso").fadeOut(100);

                var masqueBoom1 = document.getElementById("container8");
                masqueBoom1.style.position = "absolute";
                masqueBoom1.style.overflow = "hidden";
                masqueBoom1.style.height = "128px";
                masqueBoom1.style.width = "128px";
                masqueBoom1.style.top = (parseFloat(masque.style.top) - 30 + "px");
                masqueBoom1.style.left = masque.style.left;

                var boom1 = document.getElementById("explosion1");
                boom1.style.position = "absolute";
                boom1.style.top = "0px";
                boom1.style.left = "128px";

                var caVaPeter1 = window.setInterval(function () {

                    var detonation1 = parseFloat(boom1.style.left);
                    detonation1 -= 128;
                    boom1.style.left = detonation1 + "px";
                    boom1.style.display = "block";

                    if (detonation1 < -1920) {
                        boom1.style.left = "-1920px";
                        clearInterval(caVaPeter1);
                        $("#explosion1").fadeOut(4000);
                        $("#photo1").fadeIn(5000); // affichage de l'image "you lose"
                        $("#menu1").css("opacity", "1");// menu visible.
                        // window.location.reload();   // retour a zero
                    };
                }, 100);//*** vittesse de l'explosion ***
                animeToi1 = true;
            };
        };
    }, 1); //*** taux de rafraichissement de la detection de collision ***
    //*****************************************************************************
    //*********************** FIN collision boulet de canon ************************    
    //*****************************************************************************
});