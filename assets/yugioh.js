
$(document).ready(function() {
  $("#btn-load").click(function(event) {
    event.preventDefault();
    var cardName = $("#card-name").val();
    var typeMons = $("#monster-type").val();
    var sortMons = $("#sort-type").val();
    
    if (cardName === "") {
      $("#card-info").html(`
        <article class="message is-link">
          <div class="message-body">
            <i class="fas fa-exclamation-circle"></i> Please enter a card name
          </div>
        </article>
      `).show();
      $("#loading").hide();
      return;
    }
    
    $("#loading").show();
    $("#card-info").hide();
    
    $.ajax({
      type: "GET",
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?" + typeMons + sortMons + "fname=" + cardName,
      dataType: "json",
      success: function(data) {
        $("#loading").hide();
        
        var html = "";
        $.each(data.data, function(index, cardData) {
          const monsterTypes = ["Effect Monster", "Flip Effect Monster", "Fusion Monster", "Gemini Monster", "Normal Monster", "Normal Tuner Monster", "Ritual Monster", "Ritual Effect Monster", "Spirit Monster", "Synchro Monster", "Synchro Tuner Monster", "Token", "Toon Monster", "Tuner Monster", "Union Effect Monster", "XYZ Monster"];
          const pendulumMons = ["Pendulum Effect Monster", "Pendulum Effect Fusion Monster", "Pendulum Effect Ritual Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster", "Synchro Pendulum Effect Monster", "XYZ Pendulum Effect Monster"];
          
          // Card data variables
          var dataElements = [];
          
          // Attribute badge for monster cards
          var attributeBadge = '';
          if (cardData.attribute) {
            attributeBadge = `<span class="attribute-badge attribute-${cardData.attribute}">${cardData.attribute}</span>`;
          }
          
          // Handle different card types
          if (monsterTypes.includes(cardData.type)) {
            if (cardData.attribute) dataElements.push(`<span class="card-stats">Attribute: ${cardData.attribute}</span>`);
            if (cardData.level) dataElements.push(`<span class="card-stats">Level/Rank: ${cardData.level}</span>`);
            if (cardData.atk !== undefined) dataElements.push(`<span class="card-stats">ATK: ${cardData.atk}</span>`);
            if (cardData.def !== undefined) dataElements.push(`<span class="card-stats">DEF: ${cardData.def}</span>`);
          } else if (pendulumMons.includes(cardData.type)) {
            if (cardData.attribute) dataElements.push(`<span class="card-stats">Attribute: ${cardData.attribute}</span>`);
            if (cardData.level) dataElements.push(`<span class="card-stats">Level/Rank: ${cardData.level}</span>`);
            if (cardData.scale) dataElements.push(`<span class="card-stats">Scale: ${cardData.scale}</span>`);
            if (cardData.atk !== undefined) dataElements.push(`<span class="card-stats">ATK: ${cardData.atk}</span>`);
            if (cardData.def !== undefined) dataElements.push(`<span class="card-stats">DEF: ${cardData.def}</span>`);
          } else if (cardData.type === "Link Monster") {
            if (cardData.attribute) dataElements.push(`<span class="card-stats">Attribute: ${cardData.attribute}</span>`);
            if (cardData.linkval) dataElements.push(`<span class="card-stats">Link-${cardData.linkval}</span>`);
            if (cardData.atk !== undefined) dataElements.push(`<span class="card-stats">ATK: ${cardData.atk}</span>`);
            if (cardData.linkmarkers) {
              const markers = cardData.linkmarkers.join(', ');
              dataElements.push(`<span class="card-stats">Link Markers: ${markers}</span>`);
            }
          }
          
          var dataStatsHtml = dataElements.join('');
          
          html += `
            <div class="card">
              <div class="columns is-gapless">
                <div class="column is-one-quarter">
                  <div class="card-image">
                    <img src="https://images.ygoprodeck.com/images/cards_small/${cardData.id}.jpg" alt="${cardData.name}" />
                  </div>
                </div>
                <div class="column">
                  <div class="card-info-content">
                    <h3 class="card-name">${attributeBadge} ${cardData.name}</h3>
                    <div class="card-type">${cardData.type} | ${cardData.race}</div>
                    <div>${dataStatsHtml}</div>
                    <p class="card-desc">${cardData.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
        
        $("#card-info").html(`
          <article class="message is-link">
            <div class="message-body">
              <i class="fas fa-search"></i> Results for: "${cardName}" (${data.data.length} cards found)
            </div>
          </article>
          ${html}
        `).show();
      },
      error: function(xhr, status, error) {
        $("#loading").hide();
        $("#card-info").html(`
          <article class="message is-danger">
            <div class="message-body">
              <i class="fas fa-exclamation-triangle"></i> Error: ${xhr.status === 404 ? "No cards found" : error}
            </div>
          </article>
        `).show();
      }
    });
  });
});