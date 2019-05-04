(function () { //IIFE

    "use strict";

    window.addEventListener("DOMContentLoaded", function () {

        var websocketConnection = io();
        var socket = io.connect();

        $("body").css("visibility", "visible"); //***** supprimer l'effet flicker au demarrage *****

        //*******************************************
        //************** Demarrage ******************
        //*******************************************

        $("#formulaire").fadeOut(1000);
        $("#brume").fadeOut(2000);
        $("#mission").fadeOut(1000);
        $("#monTitre").fadeOut(1000);
        $("#nuages").fadeIn(14000);

        setTimeout(function () {
            monTank();
            $("#tank").fadeIn(100);
        }, 3000)

        //**** la pluie s'invite ****
        setTimeout(function () {
            $("#pluie").fadeIn(10000);
        }, 10000);

        //*********************************************
        var Pieces = function (top, left, container, piece, vitesse) {

            var masquePieces = document.getElementById(container);
            masquePieces.style.position = "absolute";
            masquePieces.style.overflow = "hidden";
            masquePieces.style.height = "61px";
            masquePieces.style.width = "68px";
            masquePieces.style.left = left;
            masquePieces.style.top = top;

            var spritePieces = document.getElementById(piece);
            spritePieces.style.position = "absolute";
            spritePieces.style.left = "0px";

            window.setInterval(function () {

                var tourne = parseFloat(spritePieces.style.left);
                tourne -= 68;
                spritePieces.style.left = tourne + "px";

                if (tourne < -1570) {
                    spritePieces.style.left = "0px";
                };
            }, vitesse);
        };

        var pieces0 = new Pieces("500px", "500px", "containerPieces0", "pieces0", 40);
        var pieces1 = new Pieces("730px", "500px", "containerPieces1", "pieces1", 42);
        var pieces2 = new Pieces("550px", "900px", "containerPieces2", "pieces2", 44);
        var pieces3 = new Pieces("650px", "900px", "containerPieces3", "pieces3", 46);
        var pieces4 = new Pieces("600px", "1200px", "containerPieces4", "pieces4", 44);
        var pieces5 = new Pieces("600px", "1400px", "containerPieces5", "pieces5", 42);
        var pieces6 = new Pieces("500px", "1640px", "containerPieces6", "pieces6", 40);
        var pieces7 = new Pieces("730px", "1640px", "containerPieces7", "pieces7", 44);
        var pieces8 = new Pieces("600px", "1860px", "containerPieces8", "pieces8", 46);
        var pieces9 = new Pieces("600px", "2160px", "containerPieces9", "pieces9", 42);
        var pieces10 = new Pieces("500px", "2460px", "containerPieces10", "pieces10", 40);
        var pieces11 = new Pieces("730px", "2460px", "containerPieces11", "pieces11", 44);
        var pieces12 = new Pieces("500px", "2860px", "containerPieces12", "pieces12", 46);
        var pieces13 = new Pieces("730px", "2860px", "containerPieces13", "pieces13", 42);
        var pieces14 = new Pieces("600px", "3160px", "containerPieces14", "pieces14", 40);
        var pieces15 = new Pieces("600px", "3460px", "containerPieces15", "pieces15", 44);

        // Affichage des 4 pieces du demarrage.
        $("#containerPieces0").fadeIn(2000);
        $("#containerPieces1").fadeIn(2000);
        $("#containerPieces2").fadeIn(4000);
        $("#containerPieces3").fadeIn(4000);

        //*********************************************
        //****************** TANKS ********************
        //*********************************************

        var monTank = function () {

            var tank = document.getElementById("tank");
            tank.style.position = "absolute";
            tank.style.top = "460px";
            tank.style.left = "-1000px";

            var cPartiLestanks = window.setInterval(function () {
                var enAvantTank = parseFloat(tank.style.left);
                enAvantTank += 1;
                tank.style.left = enAvantTank + "px";

                if (enAvantTank > 1630) {
                    clearInterval(cPartiLestanks);
                };

                //************* Ecrase le perso **************
                if (parseFloat(tank.style.left) + 900 > parseFloat(masquePersonnageBleu.style.left)) {

                    clearInterval(cPartiADroite);
                    clearInterval(cPartiAGauche);
                    clearInterval(cPartiEnBas);
                    clearInterval(cPartiEnHaut);

                    $("#personnageBleu").attr("src", "/jeux/images/deco/blood.png");
                    $("#personnageBleu").css("position", "static");
                    $("#containerPersonnageBleu").css("height", "170px");
                    $("#containerPersonnageBleu").css("width", "160px");
                    $("#game_over").fadeIn(2000);
                    $("#containerPieces").fadeOut(4000);
                    $("#tank").fadeOut(8000);
                    $("#pluie").fadeOut(2000);
                    $("#nuages").fadeOut(4000);
                    $("#soleil").fadeIn(4000);
                    $("#panneaux").fadeIn(3000);
                    $("#panneau").fadeIn(3000);
                    $("#reset").css("color", "darkred");
                    $("#reset").css("animation", "Test 1s infinite");

                    $("#menu").css("opacity", "1");

                    $("#panneauDesScores").css("left", "80%");
                    $("#panneauDesScores").css("position", "fixed");
                    $("#panneauDesScores").fadeIn(3000);
                };
            }, 11); //vitesse des tanks
        };

        //****************************************************
        //****************** Personnages *********************
        //****************************************************

        var masquePersonnageBleu = document.getElementById("containerPersonnageBleu");
        masquePersonnageBleu.style.position = "absolute";
        masquePersonnageBleu.style.overflow = "hidden";
        masquePersonnageBleu.style.height = "117px";
        masquePersonnageBleu.style.width = "150px";
        masquePersonnageBleu.style.top = "540px"; //placement de départ
        masquePersonnageBleu.style.left = "200px"; //placement de départ

        var spritePersonnageBleu = document.getElementById("personnageBleu");
        spritePersonnageBleu.style.position = "absolute";
        spritePersonnageBleu.style.top = "-351px";
        spritePersonnageBleu.style.left = "0px";

        //***********************************************
        //****************** Nuages *********************
        //***********************************************

        var masqueNuages = document.getElementById("containerNuages")
        masqueNuages.style.position = "absolute";
        masqueNuages.style.overflow = "hidden";
        masqueNuages.style.height = "920px";
        masqueNuages.style.width = "1980px";
        masqueNuages.style.left = "-60px";
        masqueNuages.style.top = "0px";

        var nuage = document.getElementById("nuages");
        nuage.style.position = "absolute";
        nuage.style.left = "0px";
        nuage.style.top = "0px";

        window.setInterval(function () {

            $("#menu:hover").css("opacity", "1"); // menu visible en passant la souris.

            var vLaLesNuages = parseFloat(nuage.style.left);
            vLaLesNuages -= 1;
            nuage.style.left = vLaLesNuages + "px";

        }, 80);

        //***********************************************
        //****************** Pluie **********************
        //***********************************************

        var masquePluie = document.getElementById("containerPluie")
        masquePluie.style.position = "absolute";
        masquePluie.style.overflow = "hidden";
        masquePluie.style.height = "920px";
        masquePluie.style.width = "1960px";
        masquePluie.style.left = "-40px";
        masquePluie.style.top = "0px";

        var pluie = document.getElementById("pluie");
        pluie.style.position = "absolute";
        pluie.style.left = "0px";
        pluie.style.top = "-100px";

        window.setInterval(function () {

            var vLaLaPluie1 = parseFloat(pluie.style.top);
            vLaLaPluie1 += 2;
            pluie.style.top = vLaLaPluie1 + "px";

            var vLaLaPluie2 = parseFloat(pluie.style.left);
            vLaLaPluie2 -= 2;
            pluie.style.left = vLaLaPluie2 + "px";

            if (vLaLaPluie1 > 0) {
                pluie.style.top = "-100px";
                pluie.style.left = "0px";
            };

        }, 3);

        //****************************************
        //*************** Soleil *****************
        //****************************************

        var soleil = document.getElementById("soleil");
        soleil.style.position = "absolute";
        soleil.style.left = "2800px";
        soleil.style.top = "-50px";
        soleil.style.display = "none";

        //****************************************************
        //*************** Panneau des scores *****************
        //****************************************************

        var panneauDesScores = document.getElementById("panneauDesScores");
        panneauDesScores.style.position = "absolute";
        panneauDesScores.style.left = "4300px";
        panneauDesScores.style.top = "0px";
        panneauDesScores.style.display = "none";

        var reset = document.getElementById("reset");

        reset.addEventListener("click", function () {
            window.open("jeux", "_self"); // recharge la page "jeux".
        });

        //****************************************
        //*************** Drapeau ****************
        //****************************************

        var masqueDrapeau = document.getElementById("containerDrapeau");
        masqueDrapeau.style.position = "absolute";
        masqueDrapeau.style.overflow = "hidden";
        masqueDrapeau.style.height = "100px";
        masqueDrapeau.style.width = "50px";
        masqueDrapeau.style.top = "550px";
        masqueDrapeau.style.left = "3890px";
        masqueDrapeau.style.display = "none";

        var spriteDrapeau = document.getElementById("drapeau");
        spriteDrapeau.style.position = "absolute";
        spriteDrapeau.style.top = "-100px";
        spriteDrapeau.style.left = "0px";

        window.setInterval(function () {

            var envoleToi = parseFloat(spriteDrapeau.style.left);
            envoleToi -= 50;
            spriteDrapeau.style.left = envoleToi + "px";

            if (envoleToi < -350) {
                spriteDrapeau.style.left = "-150px";
            };
        }, 180);


        //*****************************************************
        //****************** DEPLACEMENTS *********************
        //*****************************************************
        var score = [];

        var regardeAGauche = document.getElementById("body");

        var cPartiADroite;
        var cPartiEnHaut;
        var cPartiEnBas;
        var cPartiAGauche;

        var animeToi = false;

        window.addEventListener("keydown", function (event) {

            var code = event.keyCode;

            websocketConnection.emit('deplacement', code);

            switch (code) {

                //******************************************************************        
                //***********************  DROITE  *********************************
                //******************************************************************
                case 39:

                    if (!animeToi) {
                        cPartiADroite = window.setInterval(function () {

                            $("#menu").css("opacity", "0.4");

                            $("#panneaux").fadeIn(1000);
                            $("#panneau").fadeIn(1000);

                            regardeAGauche.style.overflow = "visible"; // pour re-scroller vers la droite

                            spritePersonnageBleu.style.top = "-351px";
                            var changementDeSprite = parseFloat(spritePersonnageBleu.style.left);
                            var decaleToiADroite = parseFloat(masquePersonnageBleu.style.left);
                            changementDeSprite -= 150;
                            spritePersonnageBleu.style.left = changementDeSprite + "px";
                            masquePersonnageBleu.style.left = decaleToiADroite + 4 + "px";

                            if (changementDeSprite < -900) {
                                spritePersonnageBleu.style.left = "-150px";
                            };

                            //******************** Obstacle tas de bois **********************
                            // monter
                            if ((parseFloat(masquePersonnageBleu.style.left) > 2555) && (parseFloat(masquePersonnageBleu.style.left) < 2580)) {
                                masquePersonnageBleu.style.left = decaleToiADroite + 2 + "px";
                                masquePersonnageBleu.style.top = parseFloat(masquePersonnageBleu.style.top) + -1 + "px";
                            };
                            // descendre
                            if ((parseFloat(masquePersonnageBleu.style.left) > 2695) && (parseFloat(masquePersonnageBleu.style.left) < 2715)) {
                                masquePersonnageBleu.style.left = decaleToiADroite + 1 + "px";
                                masquePersonnageBleu.style.top = parseFloat(masquePersonnageBleu.style.top) + 1 + "px";
                            };
                            //****************************************************************

                            //*** Nuages qui se decalle quand le perso bouge ***
                            var masqueNuagesQuiBouge = parseFloat(masqueNuages.style.left);
                            masqueNuages.style.left = masqueNuagesQuiBouge + 3 + "px";

                            var nuagesQuiBouge = parseFloat(nuage.style.left);
                            nuage.style.left = nuagesQuiBouge + -3 + "px";


                            //*** Pluie qui se decalle quand le perso bouge ***
                            var masquePluieQuiBouge = parseFloat(masquePluie.style.left);
                            masquePluie.style.left = masquePluieQuiBouge + 3 + "px";

                            var vLaLaPluie2 = parseFloat(pluie.style.left);
                            vLaLaPluie2 -= 8;
                            pluie.style.left = vLaLaPluie2 + "px";

                            //*** le soleil revient ***
                            if (masqueNuagesQuiBouge + 1918 > 3400) {
                                setTimeout(function () {
                                    $("#pluie").fadeOut(10000);
                                    $("#nuages").fadeOut(14000);
                                    $("#soleil").fadeIn(14000);

                                }, 8000);
                            };

                            if (masqueNuagesQuiBouge + 1918 > 3900) {
                                $("#containerDrapeau").fadeIn(1000);
                            };

                        }, 40); //****** vitesse de deplacement ******
                        animeToi = true;
                    };
                    break;

                    //******************************************************************
                    //************************  HAUT  **********************************
                    //******************************************************************
                case 38:

                    if (!animeToi) {
                        cPartiEnHaut = window.setInterval(function () {

                            spritePersonnageBleu.style.top = "-117px";
                            var changementDeSprite = parseFloat(spritePersonnageBleu.style.left);
                            var decaleToiEnHaut = parseFloat(masquePersonnageBleu.style.top);
                            changementDeSprite -= 150;
                            spritePersonnageBleu.style.left = changementDeSprite + "px";
                            masquePersonnageBleu.style.top = decaleToiEnHaut + -4 + "px";

                            if (changementDeSprite < -900) {
                                spritePersonnageBleu.style.left = "-150px";
                            };

                        }, 30); //****** vitesse de deplacement ******
                        animeToi = true;
                    };
                    break;


                    //******************************************************************          
                    //************************  BAS  ***********************************
                    //******************************************************************
                case 40:

                    if (!animeToi) {
                        cPartiEnBas = window.setInterval(function () {

                            spritePersonnageBleu.style.top = "0px";
                            var changementDeSprite = parseFloat(spritePersonnageBleu.style.left);
                            var decaleToiEnBas = parseFloat(masquePersonnageBleu.style.top);
                            changementDeSprite -= 150;
                            spritePersonnageBleu.style.left = changementDeSprite + "px";
                            masquePersonnageBleu.style.top = decaleToiEnBas + 4 + "px";

                            if (changementDeSprite < -900) {
                                spritePersonnageBleu.style.left = "-150px";
                            };
                        }, 30);
                        animeToi = true;
                    };
                    break;

                    //******************************************************************          
                    //************************  GAUCHE  ********************************
                    //******************************************************************
                case 17:
                case 32:
                case 37:

                    if (!animeToi) {
                        cPartiAGauche = window.setTimeout(function () {

                            spritePersonnageBleu.style.top = "-234px";
                            regardeAGauche.style.overflow = "hidden"; //pour pas voir vers la gauche (on cache la scroll bar)
                        }, 0);
                        animeToi = true;
                    };
                    break;
            };

            //****************** Score *******************

            var filtreScore = jQuery.grep(score, function (val) {
                if (val == "" || val == NaN || val == undefined || val == null) {
                    return false;
                };
                return true;
            });

            var total = 0;
            for (var i = 0; i < filtreScore.length; i++) {
                total += (filtreScore[i]);
            };

            formulaire_score.addEventListener("mousedown", function () {
                socket.emit("score", document.getElementById("topScore0").innerHTML, document.getElementById("pseudo").innerHTML);
            });

            document.getElementById("score").innerHTML = "Score : " + total; // affichage panneau du bas (score).

            document.getElementById("topScore0").innerHTML = total; // affichage panneau des scores (pseudo + score).

            //*********** FIN Touche Pieces et score ***********                   

            //*********** Touche les Pieces et elles disparaissent ***********

            if ((parseFloat(masquePersonnageBleu.style.left) > 400) && (parseFloat(masquePersonnageBleu.style.left) < 510) && (parseFloat(masquePersonnageBleu.style.top)) <= 480) {

                score[0] = 10;
                $("#pieces0").fadeOut(400);
                $("#containerPieces4").fadeIn(1000);
                $("#point0").css("display", "block");
                $("#containerPieces0").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 400) && (parseFloat(masquePersonnageBleu.style.left) < 510) && (parseFloat(masquePersonnageBleu.style.top)) >= 640) {

                score[1] = 5;
                $("#pieces1").fadeOut(400);
                $("#containerPieces4").fadeIn(1000);
                $("#point1").css("display", "block");
                $("#containerPieces1").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 800) && (parseFloat(masquePersonnageBleu.style.left) < 910) && (parseFloat(masquePersonnageBleu.style.top) >= 470) && (parseFloat(masquePersonnageBleu.style.top)) <= 520) {

                score[2] = 5;
                $("#pieces2").fadeOut(400);
                $("#containerPieces5").fadeIn(1000);
                $("#point2").css("display", "block");
                $("#containerPieces2").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 800) && (parseFloat(masquePersonnageBleu.style.left) < 910) && (parseFloat(masquePersonnageBleu.style.top) >= 580) && (parseFloat(masquePersonnageBleu.style.top)) <= 630) {

                score[3] = 10;
                $("#pieces3").fadeOut(400);
                $("#containerPieces5").fadeIn(1000);
                $("#point3").css("display", "block");
                $("#containerPieces3").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 1100) && (parseFloat(masquePersonnageBleu.style.left) < 1210) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 580) {

                score[4] = 5;
                $("#pieces4").fadeOut(400);
                $("#containerPieces6").fadeIn(1000);
                $("#containerPieces7").fadeIn(1000);
                $("#containerPieces8").fadeIn(1000);
                $("#point4").css("display", "block");
                $("#containerPieces4").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 1300) && (parseFloat(masquePersonnageBleu.style.left) < 1410) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 580) {

                score[5] = 10;
                $("#pieces5").fadeOut(400);
                $("#containerPieces6").fadeIn(1000);
                $("#containerPieces7").fadeIn(1000);
                $("#point5").css("display", "block");
                $("#containerPieces5").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 1540) && (parseFloat(masquePersonnageBleu.style.left) < 1650) && (parseFloat(masquePersonnageBleu.style.top)) <= 480) {

                score[6] = 10;
                $("#pieces6").fadeOut(400);
                $("#containerPieces8").fadeIn(1000);
                $("#containerPieces9").fadeIn(1000);
                $("#point6").css("display", "block");
                $("#containerPieces6").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 1540) && (parseFloat(masquePersonnageBleu.style.left) < 1650) && (parseFloat(masquePersonnageBleu.style.top)) >= 640) {

                score[7] = 10;
                $("#pieces7").fadeOut(400);
                $("#containerPieces8").fadeIn(1000);
                $("#containerPieces9").fadeIn(1000);
                $("#point7").css("display", "block");
                $("#containerPieces7").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 1760) && (parseFloat(masquePersonnageBleu.style.left) < 1870) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 590) {

                score[8] = 5;
                $("#pieces8").fadeOut(400);
                $("#containerPieces9").fadeIn(1000);
                $("#containerPieces10").fadeIn(1000);
                $("#containerPieces11").fadeIn(1000);
                $("#point8").css("display", "block");
                $("#containerPieces8").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 2050) && (parseFloat(masquePersonnageBleu.style.left) < 2150) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 590) {

                score[9] = 10;
                $("#pieces9").fadeOut(400);
                $("#containerPieces10").fadeIn(1000);
                $("#containerPieces11").fadeIn(1000);
                $("#containerPieces12").fadeIn(1000);
                $("#containerPieces13").fadeIn(1000);
                $("#point9").css("display", "block");
                $("#containerPieces9").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 2360) && (parseFloat(masquePersonnageBleu.style.left) < 2460) && (parseFloat(masquePersonnageBleu.style.top)) <= 480) {

                score[10] = 5;
                $("#pieces10").fadeOut(400);
                $("#containerPieces12").fadeIn(1000);
                $("#containerPieces13").fadeIn(1000);
                $("#containerPieces14").fadeIn(1000);
                $("#point10").css("display", "block");
                $("#containerPieces10").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 2360) && (parseFloat(masquePersonnageBleu.style.left) < 2460) && (parseFloat(masquePersonnageBleu.style.top)) >= 640) {

                score[11] = 10;
                $("#pieces11").fadeOut(400);
                $("#containerPieces12").fadeIn(1000);
                $("#containerPieces13").fadeIn(1000);
                $("#containerPieces14").fadeIn(1000);
                $("#point11").css("display", "block");
                $("#containerPieces11").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 2760) && (parseFloat(masquePersonnageBleu.style.left) < 2860) && (parseFloat(masquePersonnageBleu.style.top)) <= 480) {

                score[12] = 10;
                $("#pieces12").fadeOut(400);
                $("#containerPieces14").fadeIn(1000);
                $("#containerPieces15").fadeIn(1000);
                $("#point12").css("display", "block");
                $("#containerPieces12").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 2760) && (parseFloat(masquePersonnageBleu.style.left) < 2860) && (parseFloat(masquePersonnageBleu.style.top)) >= 640) {

                score[13] = 5;
                $("#pieces13").fadeOut(400);
                $("#containerPieces14").fadeIn(1000);
                $("#containerPieces15").fadeIn(1000);
                $("#point13").css("display", "block");
                $("#containerPieces13").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 3050) && (parseFloat(masquePersonnageBleu.style.left) < 3170) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 590) {

                score[14] = 10;
                $("#pieces14").fadeOut(400);
                $("#containerPieces15").fadeIn(1000);
                $("#point14").css("display", "block");
                $("#containerPieces14").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 3350) && (parseFloat(masquePersonnageBleu.style.left) < 3470) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 590) {

                score[15] = 5;
                $("#pieces15").fadeOut(400);
                $("#point15").css("display", "block");
                $("#containerPieces15").fadeOut(2000);
            };

            if ((parseFloat(masquePersonnageBleu.style.left) > 3800) && (parseFloat(masquePersonnageBleu.style.left) < 3900) && (parseFloat(masquePersonnageBleu.style.top) >= 520) && (parseFloat(masquePersonnageBleu.style.top)) <= 590) {

                $("#menu").css("opacity", "1");
                $("#panneauDesScores").fadeIn(3000);
                $("#drapeau").fadeOut(400);
                $("#tank").fadeOut(4000);
                $("#containerPieces").fadeOut(4000);
                clearInterval(cPartiADroite);
                clearInterval(cPartiAGauche);
                clearInterval(cPartiEnBas);
                clearInterval(cPartiEnHaut);
                spritePersonnageBleu.style.top = "0px";

                $("#reset").css("color", "darkred");
                $("#reset").css("animation", "Test 1s infinite");
            };

            //************* Sortie d'ecran ************
            // A droite
            if (parseFloat(masquePersonnageBleu.style.left) >= 3930) {
                clearInterval(cPartiADroite);
            };

            // En haut
            if (parseFloat(masquePersonnageBleu.style.top) <= 420) {
                clearInterval(cPartiEnHaut);
            };

            // En bas
            if (parseFloat(masquePersonnageBleu.style.top) >= 690) {
                clearInterval(cPartiEnBas);
            };
            //******** FIN sortie d'ecran ************ 
        });
        window.addEventListener("keyup", function (event) {

            var code = event.keyCode;

            switch (code) {

                case 39: // A droite
                    spritePersonnageBleu.style.left = "0px";
                    clearInterval(cPartiADroite);
                    animeToi = false;
                    break;

                case 38: // En Haut
                    spritePersonnageBleu.style.left = "0px";
                    clearInterval(cPartiEnHaut);
                    animeToi = false;
                    break;

                case 40: // En bas
                    spritePersonnageBleu.style.left = "0px";
                    clearInterval(cPartiEnBas);
                    animeToi = false;
                    break;

                case 17:
                case 32:
                case 37: // A gauche
                    clearTimeout(cPartiAGauche);
                    animeToi = false;
                    break;
            };
        });
    });
})(); //IIFE