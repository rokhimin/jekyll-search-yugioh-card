
$(document).ready(function() {
    $("#btn-load").click(function(event) {
    event.preventDefault();
    var cardName = $("#card-name").val();
    var typeMons = $("#monster-type").val();
    var sortMons = $("#sort-type").val();
    
    if (cardName === "") {
    $("#card-info").html(`
      <article class="message is-link">
        <div class="message-body"> Form nil </div>
      </article>
    `);
    $("#loading").hide();
    return;
    }
    $("#loading").show();
    $.ajax({
    type: "GET",
    url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?" + typeMons + sortMons +"fname=" + cardName,
    dataType: "json",
    success: function(data) {
      $("#loading").hide();
      $("#card-info").show();
      var html = "";
      $.each(data.data, function(index, cardData) {
        const monsterTypes = ["Effect Monster", "Flip Effect Monster", "Fusion Monster", "Gemini Monster", "Normal Monster", "Normal Tuner Monster", "Ritual Monster", "Ritual Effect Monster", "Spirit Monster", "Synchro Monster", "Synchro Tuner Monster", "Token", "Toon Monster", "Tuner Monster", "Union Effect Monster", "XYZ Monster"];
        const pendulumMons = ["Pendulum Effect Monster", "Pendulum Effect Fusion Monster", "Pendulum Effect Ritual Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster", "Synchro Pendulum Effect Monster", "XYZ Pendulum Effect Monster"];
        
        if (monsterTypes.includes(cardData.type)) {
          var data_atr = `[${cardData.attribute}]`
          var data_lvl = `[Level/Rank: ${cardData.level}]`
          var data_atk = `[ATK: ${cardData.atk}]`
          var data_def = `[DEF: ${cardData.def}]`
          var data_sc = ""
          var data_val = ""
          var data_mark = ""
        } else if (cardData.type === "Spell Card" || cardData.type === "Trap Card") {
          var data_atr = ""
          var data_lvl = ""
          var data_atk = ""
          var data_def = ""
          var data_sc = ""
          var data_val = ""
          var data_mark = ""
        } else if (pendulumMons.includes(cardData.type)) {
          var data_atr = `[${cardData.attribute}]`
          var data_lvl = `[Level/Rank: ${cardData.level}]`
          var data_atk = `[ATK: ${cardData.atk}]`
          var data_def = `[DEF: ${cardData.def}]`
          var data_sc = `[Scale: ${cardData.scale}]`
          var data_val = ""
          var data_mark = ""
        } else if (cardData.type === "Link Monster") {
          var data_atr = `[${cardData.attribute}]`
          var data_lvl = ``
          var data_atk = `[ATK: ${cardData.atk}]`
          var data_def = ""
          var data_sc = ""
          var data_val = `[Link-${cardData.linkval}]`
          var data_mark = `[${cardData.linkmarkers}]`
        }
        html += `
          <div class="hero">
            <div class="hero-body">
              <div class="columns">
                <div class="column">
                  <div class="card">
                    <div class="card-content has-background-black-ter">
                      <div class="content">
                        <div class="columns">
                          <div class="column is-one-fifth">
                            <img src="https://images.ygoprodeck.com/images/cards_small/${cardData.id}.jpg" />
                          </div>
                          <div class="column">
                            <h2>${cardData.name}</h2>
                            <p>${cardData.type} | ${cardData.race}</p>
                            ${data_atr} ${data_mark} ${data_sc} ${data_lvl} ${data_atk} ${data_def} ${data_val}
                            <p>${cardData.desc}</p>
                          </div>
                          <div class="column is-one-fifth"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      $("#card-info").html(`
        <article class="message is-link">
          <div class="message-body"> Show : "${cardName}" </div>
        </article>
        ${html}
      `);
    },
    error: function(xhr, status, error) {
      $("#loading").hide();
      $("#card-info").html(`
        <article class="message is-link">
          <div class="message-body"> Error : ${error} </div>
        </article>
      `);
    }
    });
    });
    });
    