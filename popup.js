document.addEventListener('DOMContentLoaded', function () {
    var toggleSwitch = document.getElementById('toggleSwitch');

    // Holen Sie sich den aktuellen Zustand des Schalters aus den Chrome-Einstellungen
    chrome.storage.sync.get('enabled', function (data) {
        toggleSwitch.checked = data.enabled || false;
    });

    toggleSwitch.addEventListener('change', function () {
        // Überprüfen Sie den Zustand des Schalters und speichern Sie ihn in den Chrome-Einstellungen
        chrome.storage.sync.set({ enabled: toggleSwitch.checked });

        // Senden Sie eine Nachricht an den aktuellen Tab, um das Content Script zu aktualisieren
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle', enabled: toggleSwitch.checked });
        });
    });
});

