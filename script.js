
// DEEL 1: COOKIE BANNER
// ==========================================
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');
const rejectBtn = document.getElementById('reject-cookies');

if (cookieBanner && acceptBtn && rejectBtn) {
    if (!localStorage.getItem('cookiesGekozen')) {
        cookieBanner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesGekozen', 'geaccepteerd');
        cookieBanner.style.display = 'none';
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesGekozen', 'geweigerd');
        cookieBanner.style.display = 'none';
    });
}


// ==========================================
// DEEL 2: WINKELWAGEN - PRODUCTEN OPSLAAN (Shop)
// ==========================================
const knoppen = document.querySelectorAll('.buy-btn');

knoppen.forEach(knop => {
    knop.addEventListener('click', () => {
    
        const naam = knop.getAttribute('data-name') || knop.getAttribute('data-Name') || "Padel Product";
        const ruwePrijs = knop.getAttribute('data-price') || knop.getAttribute('data-Price') || "0";
        const prijs = parseFloat(ruwePrijs); 

        // 1. Haal huidige lijst op of start een lege array
        let winkelmandje = JSON.parse(localStorage.getItem('samkoMandje')) || [];

        // 2. Voeg het product toe
        winkelmandje.push({ naam: naam, prijs: prijs });

        // 3. Sla op in localStorage
        localStorage.setItem('samkoMandje', JSON.stringify(winkelmandje));

        // Melding aan de bezoeker
        alert(naam + " is toegevoegd aan je winkelkar!");
    });
});


// ==========================================
// DEEL 3: WINKELWAGEN - ALLES OPTELLEN EN TONEN (Winkelkar)
// ==========================================
const lijst = document.getElementById('mijn-winkelmand-lijst');
const totaalVeld = document.getElementById('totaal-bedrag');

if (lijst) {
    let winkelmandje = JSON.parse(localStorage.getItem('samkoMandje')) || [];
    lijst.innerHTML = "";
    let totaalBedrag = 0;

    if (winkelmandje.length > 0) {
        // Loop door elk product
        winkelmandje.forEach(product => {
            totaalBedrag += product.prijs;
            lijst.innerHTML += "<li>" + product.naam + " — €" + product.prijs.toFixed(2) + "</li>";
        });

        // Toon totaalbedrag als het veld bestaat
        if (totaalVeld) {
            totaalVeld.innerText = "€" + totaalBedrag.toFixed(2);
        }

        // Knop om de mand te legen
        lijst.innerHTML += "<li><button onclick='leegWinkelmand()' style='margin-top: 20px; background-color: #ff3333; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;'>Winkelkar leegmaken</button></li>";

    } else {
        lijst.innerHTML = "<li>Je winkelkar is nog leeg.</li>";
        if (totaalVeld) {
            totaalVeld.innerText = "€0.00";
        }
    }
}

// FIX: Maak de functie globaal beschikbaar zodat de HTML 'onclick' hem kan bereiken
window.leegWinkelmand = function() {
    localStorage.removeItem('samkoMandje');
    location.reload(); 
};
