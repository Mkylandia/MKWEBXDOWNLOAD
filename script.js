document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SCROLL-REVEAL-ANIMATION ---
    // Diese Funktion lässt Elemente elegant erscheinen, wenn sie ins Bild scrollen.
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Animation nur einmal ausführen
                // revealObserver.unobserve(entry.target);
            } else {
                // Optional: Animation bei jedem Scrollen wiederholen
                 entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Element ist zu 10% sichtbar
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 2. "KRASSER" INTERAKTIVER 3D-TILT-EFFEKT ---
    // Diese Funktion lässt Karten auf die Mausbewegung reagieren.
    const interactiveElements = document.querySelectorAll('.interactive-3d');

    interactiveElements.forEach(element => {
        const intensity = 20; // Stärke des Effekts (kleinere Zahl = stärker)

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ( (y / rect.height) - 0.5) * -intensity;
            const rotateY = ( (x / rect.width) - 0.5) * intensity;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            // Setzt die Karte sanft in die Ausgangsposition zurück
            element.style.transition = 'transform 0.5s ease';
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        element.addEventListener('mouseenter', () => {
            // Stellt sicher, dass die "Ruckkehr"-Transition nicht beim Bewegen greift
            element.style.transition = 'transform 0.1s linear';
        });
    });

});
