const OSE = {
  systemPath: () => {
    return `/systems/${game.system.id}/dist`;
  },
  scores: {
    str: "OSE.scores.str.long",
    int: "OSE.scores.int.long",
    dex: "OSE.scores.dex.long",
    wis: "OSE.scores.wis.long",
    con: "OSE.scores.con.long",
    cha: "OSE.scores.cha.long",
  },
  scores_short: {
    str: "OSE.scores.str.short",
    int: "OSE.scores.int.short",
    dex: "OSE.scores.dex.short",
    wis: "OSE.scores.wis.short",
    con: "OSE.scores.con.short",
    cha: "OSE.scores.cha.short",
  },
  exploration_skills: {
    ld: "OSE.exploration.ld.long",
    od: "OSE.exploration.od.long",
    sd: "OSE.exploration.sd.long",
    fs: "OSE.exploration.ft.long",
  },
  exploration_skills_short: {
    ld: "OSE.exploration.ld.abrev",
    od: "OSE.exploration.od.abrev",
    sd: "OSE.exploration.sd.abrev",
    fs: "OSE.exploration.ft.abrev",
  },
  roll_type: {
    result: "=",
    above: "≥",
    below: "≤",
  },
  saves_short: {
    death: "OSE.saves.death.short",
    wand: "OSE.saves.wand.short",
    paralysis: "OSE.saves.paralysis.short",
    breath: "OSE.saves.breath.short",
    spell: "OSE.saves.spell.short",
  },
  saves_long: {
    death: "OSE.saves.death.long",
    wand: "OSE.saves.wand.long",
    paralysis: "OSE.saves.paralysis.long",
    breath: "OSE.saves.breath.long",
    spell: "OSE.saves.spell.long",
  },
  armor: {
    unarmored: "OSE.armor.unarmored",
    light: "OSE.armor.light",
    heavy: "OSE.armor.heavy",
    shield: "OSE.armor.shield",
  },
  colors: {
    green: "OSE.colors.green",
    red: "OSE.colors.red",
    yellow: "OSE.colors.yellow",
    purple: "OSE.colors.purple",
    blue: "OSE.colors.blue",
    orange: "OSE.colors.orange",
    white: "OSE.colors.white",
  },
  languages: [
    "Common",
    "Lawful",
    "Chaotic",
    "Neutral",
    "Bugbear",
    "Doppelgänger",
    "Dragon",
    "Dwarvish",
    "Elvish",
    "Gargoyle",
    "Gnoll",
    "Gnomish",
    "Goblin",
    "Halfling",
    "Harpy",
    "Hobgoblin",
    "Kobold",
    "Lizard Man",
    "Medusa",
    "Minotaur",
    "Ogre",
    "Orcish",
    "Pixie",
  ],
  tags: {
    melee: "OSE.items.Melee",
    missile: "OSE.items.Missile",
    slow: "OSE.items.Slow",
    twohanded: "OSE.items.TwoHanded",
    blunt: "OSE.items.Blunt",
    brace: "OSE.items.Brace",
    splash: "OSE.items.Splash",
    reload: "OSE.items.Reload",
    charge: "OSE.items.Charge",
  },
  tag_images: {
    melee: "systems/ose/assets/melee.png",
    missile: "systems/ose/assets/missile.png",
    slow: "systems/ose/assets/slow.png",
    twohanded: "systems/ose/assets/twohanded.png",
    blunt: "systems/ose/assets/blunt.png",
    brace: "systems/ose/assets/brace.png",
    splash: "systems/ose/assets/splash.png",
    reload: "systems/ose/assets/reload.png",
    charge: "systems/ose/assets/charge.png",
    logo: "systems/ose/assets/dndlogo.png",
  },
  monster_saves: {
    0: {
      d: 14,
      w: 15,
      p: 16,
      b: 17,
      s: 18,
    },
    1: {
      d: 12,
      w: 13,
      p: 14,
      b: 15,
      s: 16,
    },
    4: {
      d: 10,
      w: 11,
      p: 12,
      b: 13,
      s: 14,
    },
    7: {
      d: 8,
      w: 9,
      p: 10,
      b: 10,
      s: 12,
    },
    10: {
      d: 6,
      w: 7,
      p: 8,
      b: 8,
      s: 10,
    },
    13: {
      d: 4,
      w: 5,
      p: 6,
      b: 5,
      s: 8,
    },
    16: {
      d: 2,
      w: 3,
      p: 4,
      b: 3,
      s: 6,
    },
    19: {
      d: 2,
      w: 2,
      p: 2,
      b: 2,
      s: 4,
    },
    22: {
      d: 2,
      w: 2,
      p: 2,
      b: 2,
      s: 2,
    },
  },
  monster_thac0: {
    0: 20,
    1: 19,
    2: 18,
    3: 17,
    4: 16,
    5: 15,
    6: 14,
    7: 13,
    9: 12,
    10: 11,
    12: 10,
    14: 9,
    16: 8,
    18: 7,
    20: 6,
    22: 5,
  },
};

/**
 * Extend the basic ItemSheet with some very simple modifications
 */
class OseItemSheet extends ItemSheet {
  constructor(...args) {
    super(...args);

    /**
     * Keep track of the currently active sheet tab
     * @type {string}
     */
  }

  /**
   * Extend and override the default options used by the Simple Item Sheet
   * @returns {Object}
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["ose", "sheet", "item"],
      width: 520,
      height: 390,
      resizable: false,
      tabs: [
        {
          navSelector: ".tabs",
          contentSelector: ".sheet-body",
          initial: "description",
        },
      ],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    const path = `${OSE.systemPath()}/templates/items/`;
    return `${path}/${this.item.data.type}-sheet.html`;
  }

  /**
   * Prepare data for rendering the Item sheet
   * The prepared data object contains both the actor data as well as additional sheet options
   */
  getData() {
    const data = super.getData().data;
    data.editable = this.document.sheet.isEditable;
    data.config = CONFIG.OSE;
    return data;
  }

  /* -------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    html.find('input[data-action="add-tag"]').keypress((ev) => {
      if (ev.which == 13) {
        let value = $(ev.currentTarget).val();
        let values = value.split(",");
        this.object.pushManualTag(values);
      }
    });
    html.find(".tag-delete").click((ev) => {
      let value = ev.currentTarget.parentElement.dataset.tag;
      this.object.popManualTag(value);
    });
    html.find("a.melee-toggle").click(() => {
      this.object.update({ data: { melee: !this.object.data.data.melee } });
    });

    html.find("a.missile-toggle").click(() => {
      this.object.update({ data: { missile: !this.object.data.data.missile } });
    });

    super.activateListeners(html);
  }
}

class OseEntityTweaks extends FormApplication {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.id = "sheet-tweaks";
    options.template = `${OSE.systemPath()}/templates/actors/dialogs/tweaks-dialog.html`;
    options.width = 380;
    return options;
  }

  /* -------------------------------------------- */

  /**
   * Add the Entity name into the window title
   * @type {String}
   */
  get title() {
    return `${this.object.name}: ${game.i18n.localize("OSE.dialog.tweaks")}`;
  }

  /* -------------------------------------------- */

  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @return {Object}
   */
  getData() {
    const data = foundry.utils.deepClone(this.object.data);
    if (data.type === "character") {
      data.isCharacter = true;
    }
    data.user = game.user;
    data.config = {
      ...CONFIG.OSE,
      ascendingAC: game.settings.get("ose", "ascendingAC"),
    };
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }

  /**
   * This method is called upon form submission after form data is validated
   * @param event {Event}       The initial triggering submission event
   * @param formData {Object}   The object of validated form data with which to update the object
   * @private
   */
  async _updateObject(event, formData) {
    event.preventDefault();
    // Update the actor
    this.object.update(formData);
    // Re-draw the updated sheet
    this.object.sheet.render(true);
  }
}

class OseActorSheet extends ActorSheet {
  constructor(...args) {
    super(...args);
  }
  /* -------------------------------------------- */

  getData() {
    const data = foundry.utils.deepClone(super.getData().data);
    data.owner = this.actor.isOwner;
    data.editable = this.actor.sheet.isEditable;

    data.config = {
      ...CONFIG.OSE,
      ascendingAC: game.settings.get("ose", "ascendingAC"),
      initiative: game.settings.get("ose", "initiative") != "group",
      encumbrance: game.settings.get("ose", "encumbranceOption"),
    };
    data.isNew = this.actor.isNew();

    return data;
  }

  activateEditor(name, options, initialContent) {
    // remove some controls to the editor as the space is lacking
    if (name == "data.details.description") {
      options.toolbar = "styleselect bullist hr table removeFormat save";
    }
    super.activateEditor(name, options, initialContent);
  }

  // Helpers

  _getItemFromActor(event) {
    const li = event.currentTarget.closest(".item-entry");
    const item = this.actor.items.get(li.dataset.itemId);

    return item;
  }

  // end Helpers

  _toggleItemCategory(event) {
    event.preventDefault();
    const targetCategory = $(event.currentTarget);
    let items = targetCategory.next(".item-list");

    if (items.css("display") === "none") {
      let el = $(event.currentTarget).find(".fas.fa-caret-right");
      el.removeClass("fa-caret-right");
      el.addClass("fa-caret-down");

      items.slideDown(200);
    } else {
      let el = $(event.currentTarget).find(".fas.fa-caret-down");
      el.removeClass("fa-caret-down");
      el.addClass("fa-caret-right");

      items.slideUp(200);
    }
  }

  _toggleContainedItems(event) {
    event.preventDefault();
    const targetItems = $(event.target.closest(".container"));
    let items = targetItems.find(".item-list.contained-items");

    if (items.css("display") === "none") {
      let el = targetItems.find(".fas.fa-caret-right");
      el.removeClass("fa-caret-right");
      el.addClass("fa-caret-down");

      items.slideDown(200);
    } else {
      let el = targetItems.find(".fas.fa-caret-down");
      el.removeClass("fa-caret-down");
      el.addClass("fa-caret-right");

      items.slideUp(200);
    }
  }

  _toggleItemSummary(event) {
    event.preventDefault();
    const summary = $(event.currentTarget)
      .closest(".item-header")
      .next(".item-summary");

    if (summary.css("display") === "none") {
      summary.slideDown(200);
    } else {
      summary.slideUp(200);
    }
  }

  async _displayItemInChat(event) {
    const li = $(event.currentTarget).closest(".item-entry");
    const item = this.actor.items.get(li.data("itemId"));
    item.show();
  }

  async _removeItemFromActor(event) {
    const item = this._getItemFromActor(event);
    const itemDisplay = event.currentTarget.closest(".item-entry");

    if (item.type === "container" && item.data.data.itemIds) {
      const containedItems = item.data.data.itemIds;
      const updateData = containedItems.reduce((acc, val) => {
        acc.push({ _id: val.id, "data.containerId": "" });
        return acc;
      }, []);

      await this.actor.updateEmbeddedDocuments("Item", updateData);
    }
    this.actor.deleteEmbeddedDocuments("Item", [itemDisplay.dataset.itemId]);
  }

  /**
   * @param {bool} decrement
   */
  _useConsumable(event, decrement) {
    const item = this._getItemFromActor(event);

    if (decrement) {
      item.update({ "data.quantity.value": item.data.data.quantity.value - 1 });
    } else {
      item.update({ "data.quantity.value": item.data.data.quantity.value + 1 });
    }
  }

  async _onSpellChange(event) {
    event.preventDefault();
    const item = this._getItemFromActor(event);
    if (event.target.dataset.field == "cast") {
      return item.update({ "data.cast": parseInt(event.target.value) });
    } else if (event.target.dataset.field == "memorize") {
      return item.update({
        "data.memorized": parseInt(event.target.value),
      });
    }
  }

  async _resetSpells(event) {
    let spells = $(event.currentTarget)
      .closest(".inventory.spells")
      .find(".item-entry");
    spells.each((_, el) => {
      let itemId = el.dataset.itemId;
      const item = this.actor.items.get(itemId);
      item.update({
        _id: item.id,
        "data.cast": item.data.data.memorized,
      });
    });
  }

  async _rollAbility(event) {
    const item = this._getItemFromActor(event);
    if (item.type == "weapon") {
      if (this.actor.data.type === "monster") {
        item.update({
          data: { counter: { value: item.data.data.counter.value - 1 } },
        });
      }
      item.rollWeapon({ skipDialog: event.ctrlKey || event.metaKey });
    } else if (item.type == "spell") {
      item.spendSpell({ skipDialog: event.ctrlKey || event.metaKey });
    } else {
      item.rollFormula({ skipDialog: event.ctrlKey || event.metaKey });
    }
  }

  async _rollSave(event) {
    let actorObject = this.actor;
    let element = event.currentTarget;
    let save = element.parentElement.parentElement.dataset.save;
    actorObject.rollSave(save, { event: event });
  }

  async _rollAttack(event) {
    let actorObject = this.actor;
    let element = event.currentTarget;
    let attack = element.parentElement.parentElement.dataset.attack;
    const rollData = {
      actor: this.data,
      roll: {},
    };
    actorObject.targetAttack(rollData, attack, {
      type: attack,
      skipDialog: event.ctrlKey || event.metaKey,
    });
  }

  _onSortItem(event, itemData) {
    const source = this.actor.items.get(itemData._id);
    const siblings = this.actor.items.filter((i) => {
      return i.data._id !== source.data._id;
    });
    const dropTarget = event.target.closest("[data-item-id]");
    const targetId = dropTarget ? dropTarget.dataset.itemId : null;
    const target = siblings.find((s) => s.data._id === targetId);

    // Dragging items into a container
    if (
      target?.data.type === "container" &&
      target?.data.data.containerId === ""
    ) {
      this.actor.updateEmbeddedDocuments("Item", [
        { _id: source.id, "data.containerId": target.id },
      ]);
      return;
    }
    if (source?.data.containerId !== "") {
      this.actor.updateEmbeddedDocuments("Item", [
        { _id: source.id, "data.containerId": "" },
      ]);
    }

    super._onSortItem(event, itemData);
  }

  _onDragStart(event) {
    const li = event.currentTarget;
    let itemIdsArray = [];
    if (event.target.classList.contains("content-link")) return;

    // Create drag data
    const dragData = {
      actorId: this.actor.id,
      sceneId: this.actor.isToken ? canvas.scene?.id : null,
      tokenId: this.actor.isToken ? this.actor.token.id : null,
      pack: this.actor.pack,
    };

    // Owned Items
    if (li.dataset.itemId) {
      const item = this.actor.items.get(li.dataset.itemId);
      dragData.type = "Item";
      dragData.data = item.data;
      if (item.data.type === "container" && item.data.data.itemIds.length) {
        //otherwise JSON.stringify will quadruple stringify for some reason
        itemIdsArray = item.data.data.itemIds;
      }
    }

    // Active Effect
    if (li.dataset.effectId) {
      const effect = this.actor.effects.get(li.dataset.effectId);
      dragData.type = "ActiveEffect";
      dragData.data = effect.data;
    }

    // Set data transfer
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify(dragData, (key, value) => {
        if (key === "itemIds") {
          //something about how this Array is created makes its elements not real Array elements
          //we go through this hoop to trick stringify into creating our string
          return JSON.stringify(itemIdsArray);
        }
        return value;
      })
    );
  }

  async _onDropItemCreate(itemData) {
    //override to fix hidden items because their original containers don't exist on this actor
    itemData = itemData instanceof Array ? itemData : [itemData];
    itemData.forEach((item) => {
      if (item.data.containerId && item.data.containerId !== "")
        item.data.containerId = "";
      if (item.type === "container" && typeof item.data.itemIds === "string") {
        //itemIds was double stringified to fix strange behavior with stringify blanking our Arrays
        const containedItems = JSON.parse(item.data.itemIds);
        containedItems.forEach((containedItem) => {
          containedItem.data.containerId = "";
        });
        itemData.push(...containedItems);
      }
    });
    return this.actor.createEmbeddedDocuments("Item", itemData);
  }

  /* -------------------------------------------- */

  async _chooseItemType(choices = ["weapon", "armor", "shield", "gear"]) {
    let templateData = { types: choices },
      dlg = await renderTemplate(
        `${OSE.systemPath()}/templates/items/entity-create.html`,
        templateData
      );
    //Create Dialog window
    return new Promise((resolve) => {
      new Dialog({
        title: game.i18n.localize("OSE.dialog.createItem"),
        content: dlg,
        buttons: {
          ok: {
            label: game.i18n.localize("OSE.Ok"),
            icon: '<i class="fas fa-check"></i>',
            callback: (html) => {
              resolve({
                type: html.find('select[name="type"]').val(),
                name: html.find('input[name="name"]').val(),
              });
            },
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: game.i18n.localize("OSE.Cancel"),
          },
        },
        default: "ok",
      }).render(true);
    });
  }

  _createItem(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;

    // item creation helper func
    const createItem = function (type, name) {
      const itemData = {
        name: name ? name : `New ${type.capitalize()}`,
        type: type,
        data: duplicate(header.dataset),
      };
      delete itemData.data["type"];
      return itemData;
    };

    // Getting back to main logic
    if (type === "choice") {
      const choices = header.dataset.choices.split(",");
      this._chooseItemType(choices).then((dialogInput) => {
        const itemData = createItem(dialogInput.type, dialogInput.name);
        this.actor.createEmbeddedDocuments("Item", [itemData], {});
      });
    } else {
      const itemData = createItem(type);
      return this.actor.createEmbeddedDocuments("Item", [itemData], {});
    }
  }

  async _updateItemQuantity(event) {
    event.preventDefault();
    const item = this._getItemFromActor(event);

    if (event.target.dataset.field === "value") {
      return item.update({
        "data.quantity.value": parseInt(event.target.value),
      });
    } else if (event.target.dataset.field === "max") {
      return item.update({
        "data.quantity.max": parseInt(event.target.value),
      });
    }
  }

  // Override to set resizable initial size
  async _renderInner(...args) {
    const html = await super._renderInner(...args);
    this.form = html[0];

    // Resize resizable classes
    let resizable = html.find(".resizable");
    if (resizable.length == 0) {
      return;
    }
    resizable.each((_, el) => {
      let heightDelta = this.position.height - this.options.height;
      el.style.height = `${heightDelta + parseInt(el.dataset.baseSize)}px`;
    });
    return html;
  }

  async _onResize(event) {
    super._onResize(event);

    let html = $(this.form);
    let resizable = html.find(".resizable");
    if (resizable.length == 0) {
      return;
    }
    // Resize divs
    resizable.each((_, el) => {
      let heightDelta = this.position.height - this.options.height;
      el.style.height = `${heightDelta + parseInt(el.dataset.baseSize)}px`;
    });
    // Resize editors
    let editors = html.find(".editor");
    editors.each((id, editor) => {
      let container = editor.closest(".resizable-editor");
      if (container) {
        let heightDelta = this.position.height - this.options.height;
        editor.style.height = `${
          heightDelta + parseInt(container.dataset.editorSize)
        }px`;
      }
    });
  }

  _onConfigureActor(event) {
    event.preventDefault();
    new OseEntityTweaks(this.actor, {
      top: this.position.top + 40,
      left: this.position.left + (this.position.width - 400) / 2,
    }).render(true);
  }

  /**
   * Extend and override the sheet header buttons
   * @override
   */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();

    // Token Configuration
    const canConfigure = game.user.isGM || this.actor.isOwner;
    if (this.options.editable && canConfigure) {
      buttons = [
        {
          label: game.i18n.localize("OSE.dialog.tweaks"),
          class: "configure-actor",
          icon: "fas fa-code",
          onclick: (event) => this._onConfigureActor(event),
        },
      ].concat(buttons);
    }
    return buttons;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Attributes
    html.find(".saving-throw .attribute-name a").click((event) => {
      this._rollSave(event);
    });

    html.find(".attack a").click((event) => {
      this._rollAttack(event);
    });

    html.find(".hit-dice .attribute-name").click((event) => {
      this.actor.rollHitDice({ event: event });
    });

    // Items (Abilities, Inventory and Spells)
    html.find(".item-rollable .item-image").click(async (event) => {
      this._rollAbility(event);
    });

    html.find(".inventory .item-category-title").click((event) => {
      this._toggleItemCategory(event);
    });
    html.find(".inventory .category-caret").click((event) => {
      this._toggleContainedItems(event);
    });

    html.find(".item-name").click((event) => {
      this._toggleItemSummary(event);
    });

    html.find(".item-controls .item-show").click(async (event) => {
      this._displayItemInChat(event);
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Item Management
    html.find(".item-create").click((event) => {
      this._createItem(event);
    });

    html.find(".item-edit").click((event) => {
      const item = this._getItemFromActor(event);
      item.sheet.render(true);
    });

    html.find(".item-delete").click((event) => {
      this._removeItemFromActor(event);
    });

    html
      .find(".quantity input")
      .click((ev) => ev.target.select())
      .change(this._updateItemQuantity.bind(this));

    // Consumables
    html.find(".consumable-counter .full-mark").click((event) => {
      this._useConsumable(event, true);
    });
    html.find(".consumable-counter .empty-mark").click((event) => {
      this._useConsumable(event, false);
    });

    // Spells
    html
      .find(".memorize input")
      .click((event) => event.target.select())
      .change(this._onSpellChange.bind(this));

    html
      .find(".spells .item-reset[data-action='reset-spells']")
      .click((event) => {
        this._resetSpells(event);
      });
  }
}

class OseCharacterModifiers extends FormApplication {
  static get defaultOptions() {
    const options = super.defaultOptions;
    (options.classes = ["ose", "dialog", "modifiers"]),
      (options.id = "sheet-modifiers");
    options.template = `${OSE.systemPath()}/templates/actors/dialogs/modifiers-dialog.html`;
    options.width = 240;
    return options;
  }

  /* -------------------------------------------- */

  /**
   * Add the Entity name into the window title
   * @type {String}
   */
  get title() {
    return `${this.object.name}: Modifiers`;
  }

  /* -------------------------------------------- */

  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @return {Object}
   */
  getData() {
    const data = foundry.utils.deepClone(this.object.data);
    data.user = game.user;
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }
}

class OseDice {
  static async sendRoll({
    parts = [],
    data = {},
    title = null,
    flavor = null,
    speaker = null,
    form = null,
    chatMessage = true,
  } = {}) {
    const template = `${OSE.systemPath()}/templates/chat/roll-result.html`;

    let chatData = {
      user: game.user.id,
      speaker: speaker,
    };

    const templateData = {
      title: title,
      flavor: flavor,
      data: data,
    };

    // Optionally include a situational bonus
    if (form !== null && form.bonus.value) {
      parts.push(form.bonus.value);
    }

    //;
    const roll = new Roll(parts.join("+"), data).evaluate({ async: false });

    // Convert the roll to a chat message and return the roll
    let rollMode = game.settings.get("core", "rollMode");
    rollMode = form ? form.rollMode.value : rollMode;

    // Force blind roll (ability formulas)
    if (!form && data.roll.blindroll) {
      rollMode = game.user.isGM ? "selfroll" : "blindroll";
    }

    if (["gmroll", "blindroll"].includes(rollMode))
      chatData["whisper"] = ChatMessage.getWhisperRecipients("GM");
    if (rollMode === "selfroll") chatData["whisper"] = [game.user._id];
    if (rollMode === "blindroll") {
      chatData["blind"] = true;
      data.roll.blindroll = true;
    }

    templateData.result = OseDice.digestResult(data, roll);

    return new Promise((resolve) => {
      roll.render().then((r) => {
        templateData.rollOSE = r;
        renderTemplate(template, templateData).then((content) => {
          chatData.content = content;
          // Dice So Nice
          if (game.dice3d) {
            game.dice3d
              .showForRoll(
                roll,
                game.user,
                true,
                chatData.whisper,
                chatData.blind
              )
              .then((displayed) => {
                if (chatMessage !== false) ChatMessage.create(chatData);
                resolve(roll);
              });
          } else {
            chatData.sound = CONFIG.sounds.dice;
            if (chatMessage !== false) ChatMessage.create(chatData);
            resolve(roll);
          }
        });
      });
    });
  }

  static digestResult(data, roll) {
    let result = {
      isSuccess: false,
      isFailure: false,
      target: data.roll.target,
      total: roll.total,
    };

    let die = roll.terms[0].total;
    if (data.roll.type == "result") {
      if (roll.total == result.target) {
        result.isSuccess = true;
      } else {
        result.isFailure = true;
      }
    } else if (data.roll.type == "above") {
      // SAVING THROWS
      if (roll.total >= result.target) {
        result.isSuccess = true;
      } else {
        result.isFailure = true;
      }
    } else if (data.roll.type == "below") {
      // MORALE, EXPLORATION
      if (roll.total <= result.target) {
        result.isSuccess = true;
      } else {
        result.isFailure = true;
      }
    } else if (data.roll.type == "check") {
      // SCORE CHECKS (1s and 20s)
      if (die == 1 || (roll.total <= result.target && die < 20)) {
        result.isSuccess = true;
      } else {
        result.isFailure = true;
      }
    } else if (data.roll.type == "table") {
      // Reaction
      let table = data.roll.table;
      let output = Object.values(table)[0];
      for (let i = 0; i <= roll.total; i++) {
        if (table[i]) {
          output = table[i];
        }
      }
      result.details = output;
    }
    return result;
  }

  static attackIsSuccess(roll, thac0, ac) {
    if (roll.total == 1 || roll.terms[0].results[0] == 1) {
      return false;
    }
    if (roll.total >= 20 || roll.terms[0].results[0] == 20) {
      return -3;
    }
    if (roll.total + ac >= thac0) {
      return true;
    }
    return false;
  }

  static digestAttackResult(data, roll) {
    let result = {
      isSuccess: false,
      isFailure: false,
      target: "",
      total: roll.total,
    };
    result.target = data.roll.thac0;

    const targetAc = data.roll.target
      ? data.roll.target.actor.data.data.ac.value
      : 9;
    const targetAac = data.roll.target
      ? data.roll.target.actor.data.data.aac.value
      : 0;
    result.victim = data.roll.target ? data.roll.target.data.name : null;

    if (game.settings.get("ose", "ascendingAC")) {
      if (
        (roll.terms[0] != 20 && roll.total < targetAac) ||
        roll.terms[0] == 1
      ) {
        result.details = game.i18n.format(
          "OSE.messages.AttackAscendingFailure",
          {
            bonus: result.target,
          }
        );
        return result;
      }
      result.details = game.i18n.format("OSE.messages.AttackAscendingSuccess", {
        result: roll.total,
      });
      result.isSuccess = true;
    } else {
      if (!this.attackIsSuccess(roll, result.target, targetAc)) {
        result.details = game.i18n.format("OSE.messages.AttackFailure", {
          bonus: result.target,
        });
        return result;
      }
      result.isSuccess = true;
      let value = Math.clamped(result.target - roll.total, -3, 9);
      result.details = game.i18n.format("OSE.messages.AttackSuccess", {
        result: value,
        bonus: result.target,
      });
    }
    return result;
  }

  static async sendAttackRoll({
    parts = [],
    data = {},
    flags = {},
    title = null,
    flavor = null,
    speaker = null,
    form = null,
  } = {}) {
    const template = `${OSE.systemPath()}/templates/chat/roll-attack.html`;
    let chatData = {
      user: game.user.id,
      speaker: speaker,
      flags: flags,
    };

    let templateData = {
      title: title,
      flavor: flavor,
      data: data,
      config: CONFIG.OSE,
    };

    // Optionally include a situational bonus
    if (form !== null && form.bonus.value) parts.push(form.bonus.value);

    const roll = new Roll(parts.join("+"), data).evaluate({ async: false });
    const dmgRoll = new Roll(data.roll.dmg.join("+"), data).evaluate({
      async: false,
    });

    // Convert the roll to a chat message and return the roll
    let rollMode = game.settings.get("core", "rollMode");
    rollMode = form ? form.rollMode.value : rollMode;

    // Force blind roll (ability formulas)
    if (data.roll.blindroll) {
      rollMode = game.user.isGM ? "selfroll" : "blindroll";
    }

    if (["gmroll", "blindroll"].includes(rollMode))
      chatData["whisper"] = ChatMessage.getWhisperRecipients("GM");
    if (rollMode === "selfroll") chatData["whisper"] = [game.user._id];
    if (rollMode === "blindroll") {
      chatData["blind"] = true;
      data.roll.blindroll = true;
    }

    templateData.result = OseDice.digestAttackResult(data, roll);

    return new Promise((resolve) => {
      roll.render().then((r) => {
        templateData.rollOSE = r;
        dmgRoll.render().then((dr) => {
          templateData.rollDamage = dr;
          renderTemplate(template, templateData).then((content) => {
            chatData.content = content;
            // 2 Step Dice So Nice
            if (game.dice3d) {
              game.dice3d
                .showForRoll(
                  roll,
                  game.user,
                  true,
                  chatData.whisper,
                  chatData.blind
                )
                .then(() => {
                  if (templateData.result.isSuccess) {
                    templateData.result.dmg = dmgRoll.total;
                    game.dice3d
                      .showForRoll(
                        dmgRoll,
                        game.user,
                        true,
                        chatData.whisper,
                        chatData.blind
                      )
                      .then(() => {
                        ChatMessage.create(chatData);
                        resolve(roll);
                      });
                  } else {
                    ChatMessage.create(chatData);
                    resolve(roll);
                  }
                });
            } else {
              chatData.sound = CONFIG.sounds.dice;
              ChatMessage.create(chatData);
              resolve(roll);
            }
          });
        });
      });
    });
  }

  static async RollSave({
    parts = [],
    data = {},
    skipDialog = false,
    speaker = null,
    flavor = null,
    title = null,
    chatMessage = true,
  } = {}) {
    let rolled = false;
    const template = `${OSE.systemPath()}/templates/chat/roll-dialog.html`;
    let dialogData = {
      formula: parts.join(" "),
      data: data,
      rollMode: game.settings.get("core", "rollMode"),
      rollModes: CONFIG.Dice.rollModes,
    };

    let rollData = {
      parts: parts,
      data: data,
      title: title,
      flavor: flavor,
      speaker: speaker,
      chatMessage: chatMessage,
    };
    if (skipDialog) {
      return OseDice.sendRoll(rollData);
    }

    let buttons = {
      ok: {
        label: game.i18n.localize("OSE.Roll"),
        icon: '<i class="fas fa-dice-d20"></i>',
        callback: (html) => {
          rolled = true;
          rollData.form = html[0].querySelector("form");
          roll = OseDice.sendRoll(rollData);
        },
      },
      magic: {
        label: game.i18n.localize("OSE.saves.magic.short"),
        icon: '<i class="fas fa-magic"></i>',
        callback: (html) => {
          rolled = true;
          rollData.form = html[0].querySelector("form");
          rollData.parts.push(`${rollData.data.roll.magic}`);
          rollData.title += ` ${game.i18n.localize("OSE.saves.magic.short")} (${
            rollData.data.roll.magic
          })`;
          roll = OseDice.sendRoll(rollData);
        },
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: game.i18n.localize("OSE.Cancel"),
        callback: (html) => {},
      },
    };

    const html = await renderTemplate(template, dialogData);
    let roll;

    //Create Dialog window
    return new Promise((resolve) => {
      new Dialog({
        title: title,
        content: html,
        buttons: buttons,
        default: "ok",
        close: () => {
          resolve(rolled ? roll : false);
        },
      }).render(true);
    });
  }

  static async Roll({
    parts = [],
    data = {},
    skipDialog = false,
    speaker = null,
    flavor = null,
    title = null,
    chatMessage = true,
    flags = {},
  } = {}) {
    let rolled = false;
    const template = `${OSE.systemPath()}/templates/chat/roll-dialog.html`;
    let dialogData = {
      formula: parts.join(" "),
      data: data,
      rollMode: data.roll.blindroll
        ? "blindroll"
        : game.settings.get("core", "rollMode"),
      rollModes: CONFIG.Dice.rollModes,
    };
    let rollData = {
      parts: parts,
      data: data,
      title: title,
      flavor: flavor,
      speaker: speaker,
      chatMessage: chatMessage,
      flags: flags,
    };
    if (skipDialog) {
      return ["melee", "missile", "attack"].includes(data.roll.type)
        ? OseDice.sendAttackRoll(rollData)
        : OseDice.sendRoll(rollData);
    }

    let buttons = {
      ok: {
        label: game.i18n.localize("OSE.Roll"),
        icon: '<i class="fas fa-dice-d20"></i>',
        callback: (html) => {
          rolled = true;
          rollData.form = html[0].querySelector("form");
          roll = ["melee", "missile", "attack"].includes(data.roll.type)
            ? OseDice.sendAttackRoll(rollData)
            : OseDice.sendRoll(rollData);
        },
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: game.i18n.localize("OSE.Cancel"),
        callback: (html) => {},
      },
    };

    const html = await renderTemplate(template, dialogData);
    let roll;

    //Create Dialog window
    return new Promise((resolve) => {
      new Dialog({
        title: title,
        content: html,
        buttons: buttons,
        default: "ok",
        close: () => {
          resolve(rolled ? roll : false);
        },
      }).render(true);
    });
  }
}

class OseCharacterCreator extends FormApplication {
  static get defaultOptions() {
    const options = super.defaultOptions;
    (options.classes = ["ose", "dialog", "creator"]),
      (options.id = "character-creator");
    options.template = `${OSE.systemPath()}/templates/actors/dialogs/character-creation.html`;
    options.width = 235;
    return options;
  }

  /* -------------------------------------------- */

  /**
   * Add the Entity name into the window title
   * @type {String}
   */
  get title() {
    return `${this.object.name}: ${game.i18n.localize("OSE.dialog.generator")}`;
  }

  /* -------------------------------------------- */

  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @return {Object}
   */
  getData() {
    let data = foundry.utils.deepClone(this.object.data);
    data.user = game.user;
    data.config = CONFIG.OSE;
    this.counters = {
      str: 0,
      wis: 0,
      dex: 0,
      int: 0,
      cha: 0,
      con: 0,
      gold: 0,
    };
    this.stats = {
      sum: 0,
      avg: 0,
      std: 0,
    };
    this.scores = {};
    this.gold = 0;
    return data;
  }

  /* -------------------------------------------- */

  doStats(ev) {
    const list = $(ev.currentTarget).closest(".attribute-list");
    const scores = Object.values(this.scores);
    const n = scores.length;
    const sum = scores.reduce((acc, next) => acc + next.value, 0);
    const mean = parseFloat(sum) / n;
    const std = Math.sqrt(
      scores
        .map((x) => Math.pow(x.value - mean, 2))
        .reduce((acc, next) => acc + next, 0) / n
    );

    let stats = list.siblings(".roll-stats");
    stats.find(".sum").text(sum);
    stats.find(".avg").text(Math.round((10 * sum) / n) / 10);
    stats.find(".std").text(Math.round(100 * std) / 100);

    if (n >= 6) {
      $(ev.currentTarget)
        .closest("form")
        .find('button[type="submit"]')
        .removeAttr("disabled");
    }

    this.object.data.stats = {
      sum: sum,
      avg: Math.round((10 * sum) / n) / 10,
      std: Math.round(100 * std) / 100,
    };
  }

  rollScore(score, options = {}) {
    // Increase counter
    this.counters[score]++;

    const label =
      score != "gold" ? game.i18n.localize(`OSE.scores.${score}.long`) : "Gold";
    const rollParts = ["3d6"];
    const data = {
      roll: {
        type: "result",
      },
    };
    if (options.skipMessage) {
      return new Roll(rollParts[0]).evaluate({ async: false });
    }
    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("OSE.dialog.generateScore", {
        score: label,
        count: this.counters[score],
      }),
      title: game.i18n.format("OSE.dialog.generateScore", {
        score: label,
        count: this.counters[score],
      }),
    });
  }

  async close(options) {
    // Gather scores
    const speaker = ChatMessage.getSpeaker({ actor: this });
    const templateData = {
      config: CONFIG.OSE,
      scores: this.scores,
      title: game.i18n.localize("OSE.dialog.generator"),
      stats: this.object.data.stats,
      gold: this.gold,
    };
    const content = await renderTemplate(
      `${OSE.systemPath()}/templates/chat/roll-creation.html`,
      templateData
    );
    ChatMessage.create({
      content: content,
      speaker,
    });
    return super.close(options);
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find("a.score-roll").click((ev) => {
      let el = ev.currentTarget.parentElement.parentElement;
      let score = el.dataset.score;
      this.rollScore(score, { event: ev }).then((r) => {
        this.scores[score] = { value: r.total };
        $(el).find("input").val(r.total).trigger("change");
      });
    });

    html.find("a.gold-roll").click((ev) => {
      let el = ev.currentTarget.parentElement.parentElement.parentElement;
      this.rollScore("gold", { event: ev }).then((r) => {
        this.gold = 10 * r.total;
        $(el).find(".gold-value").val(this.gold);
      });
    });

    html.find("input.score-value").change((ev) => {
      this.doStats(ev);
    });

    html.find("a.auto-roll").click(async (ev) => {
      const stats = ["str", "int", "dex", "wis", "con", "cha"];
      for (let char of stats) {
        const r = await this.rollScore(char, { event: ev, skipMessage: true });
        this.scores[char] = { value: r.total };
      }
      this.doStats(ev);
      const r = await this.rollScore("gold", { event: ev, skipMessage: true });
      this.gold = 10 * r.total;
      this.submit();
    });
  }

  async _onSubmit(
    event,
    { updateData = null, preventClose = false, preventRender = false } = {}
  ) {
    updateData = { ...updateData, data: { scores: this.scores } };
    super._onSubmit(event, {
      updateData: updateData,
      preventClose: preventClose,
      preventRender: preventRender,
    });
    // Generate gold
    const itemData = {
      name: "GP",
      type: "item",
      img: "systems/ose/assets/gold.png",
      data: {
        treasure: true,
        cost: 1,
        weight: 1,
        quantity: {
          value: this.gold,
        },
      },
    };
    this.object.createEmbeddedDocuments("Item", [itemData]);
  }
  /**
   * This method is called upon form submission after form data is validated
   * @param event {Event}       The initial triggering submission event
   * @param formData {Object}   The object of validated form data with which to update the object
   * @private
   */
  async _updateObject(event, formData) {
    event.preventDefault();
    // Update the actor
    await this.object.update(formData);

    // Re-draw the updated sheet
    this.object.sheet.render(true);
  }
}

/**
 * Extend the basic ActorSheet with some very simple modifications
 */
class OseActorSheetCharacter extends OseActorSheet {
  constructor(...args) {
    super(...args);
  }

  /* -------------------------------------------- */

  /**
   * Extend and override the default options used by the 5e Actor Sheet
   * @returns {Object}
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["ose", "sheet", "actor", "character"],
      template: `${OSE.systemPath()}/templates/actors/character-sheet.html`,
      width: 450,
      height: 530,
      resizable: true,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "attributes",
        },
      ],
      scrollY: [".inventory"],
    });
  }

  /**
   * Organize and classify Owned Items for Character sheets
   * @private
   */
  _prepareItems(data) {
    const itemsData = this.actor.data.items;
    const containerContents = {};
    // Partition items by category
    let [containers, treasures, items, weapons, armors, abilities, spells] =
      itemsData.reduce(
        (arr, item) => {
          // Classify items into types
          const containerId = item?.data?.data?.containerId;
          if (containerId) {
            containerContents[containerId] = [
              ...(containerContents[containerId] || []),
              item,
            ];
          } else if (item.type === "container") arr[0].push(item);
          else if (item.type === "item" && item?.data?.data?.treasure)
            arr[1].push(item);
          else if (item.type === "item") arr[2].push(item);
          else if (item.type === "weapon") arr[3].push(item);
          else if (item.type === "armor") arr[4].push(item);
          else if (item.type === "ability") arr[5].push(item);
          else if (item.type === "spell") arr[6].push(item);
          return arr;
        },
        [[], [], [], [], [], [], []]
      );
    // Sort spells by level
    var sortedSpells = {};
    var slots = {};
    for (var i = 0; i < spells.length; i++) {
      const lvl = spells[i].data.data.lvl;
      if (!sortedSpells[lvl]) sortedSpells[lvl] = [];
      if (!slots[lvl]) slots[lvl] = 0;
      slots[lvl] += spells[i].data.data.memorized;
      sortedSpells[lvl].push(spells[i]);
    }
    data.slots = {
      used: slots,
    };
    containers.map((container, key, arr) => {
      arr[key].data.data.itemIds = containerContents[container.id] || [];
      arr[key].data.data.totalWeight = containerContents[container.id]?.reduce(
        (acc, item) => {
          return (
            acc +
            item.data?.data?.weight * (item.data?.data?.quantity?.value || 1)
          );
        },
        0
      );
      return arr;
    });

    // Assign and return
    data.owned = {
      items: items,
      armors: armors,
      weapons: weapons,
      treasures: treasures,
      containers: containers,
    };
    data.containers = containers;
    data.abilities = abilities;
    data.spells = sortedSpells;

    // Sort by sort order (see ActorSheet)
    [
      ...Object.values(data.owned),
      ...Object.values(data.spells),
      data.abilities,
    ].forEach((o) => o.sort((a, b) => (a.data.sort || 0) - (b.data.sort || 0)));
  }

  generateScores() {
    new OseCharacterCreator(this.actor, {
      top: this.position.top + 40,
      left: this.position.left + (this.position.width - 400) / 2,
    }).render(true);
  }

  /**
   * Prepare data for rendering the Actor sheet
   * The prepared data object contains both the actor data as well as additional sheet options
   */
  getData() {
    const data = super.getData();
    // Prepare owned items
    this._prepareItems(data);
    return data;
  }

  async _chooseLang() {
    let choices = CONFIG.OSE.languages;

    let templateData = { choices: choices },
      dlg = await renderTemplate(
        `${OSE.systemPath()}/templates/actors/dialogs/lang-create.html`,
        templateData
      );
    //Create Dialog window
    return new Promise((resolve) => {
      new Dialog({
        title: "",
        content: dlg,
        buttons: {
          ok: {
            label: game.i18n.localize("OSE.Ok"),
            icon: '<i class="fas fa-check"></i>',
            callback: (html) => {
              resolve({
                choice: html.find('select[name="choice"]').val(),
              });
            },
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: game.i18n.localize("OSE.Cancel"),
          },
        },
        default: "ok",
      }).render(true);
    });
  }

  _pushLang(table) {
    const data = this.actor.data.data;
    let update = duplicate(data[table]);
    this._chooseLang().then((dialogInput) => {
      const name = CONFIG.OSE.languages[dialogInput.choice];
      if (update.value) {
        update.value.push(name);
      } else {
        update = { value: [name] };
      }
      let newData = {};
      newData[table] = update;
      return this.actor.update({ data: newData });
    });
  }

  _popLang(table, lang) {
    const data = this.actor.data.data;
    let update = data[table].value.filter((el) => el != lang);
    let newData = {};
    newData[table] = { value: update };
    return this.actor.update({ data: newData });
  }

  /* -------------------------------------------- */

  _onShowModifiers(event) {
    event.preventDefault();
    new OseCharacterModifiers(this.actor, {
      top: this.position.top + 40,
      left: this.position.left + (this.position.width - 400) / 2,
    }).render(true);
  }

  async _onShowItemTooltip(event) {
    let templateData = {},
      dlg = await renderTemplate(
        `${OSE.systemPath()}/templates/actors/partials/character-item-tooltip.html`,
        templateData
      );
    document.querySelector(".game").append(dlg);
  }

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".ability-score .attribute-name a").click((ev) => {
      let actorObject = this.actor;
      let element = ev.currentTarget;
      let score = element.parentElement.parentElement.dataset.score;
      let stat = element.parentElement.parentElement.dataset.stat;
      if (!score) {
        if (stat == "lr") {
          actorObject.rollLoyalty(score, { event: ev });
        }
      } else {
        actorObject.rollCheck(score, { event: ev });
      }
    });

    html.find(".exploration .attribute-name a").click((ev) => {
      let actorObject = this.actor;
      let element = ev.currentTarget;
      let expl = element.parentElement.parentElement.dataset.exploration;
      actorObject.rollExploration(expl, { event: ev });
    });

    html.find("a[data-action='modifiers']").click((ev) => {
      this._onShowModifiers(ev);
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Language Management
    html.find(".item-push").click((ev) => {
      ev.preventDefault();
      const header = ev.currentTarget;
      const table = header.dataset.array;
      this._pushLang(table);
    });

    html.find(".item-pop").click((ev) => {
      ev.preventDefault();
      const header = ev.currentTarget;
      const table = header.dataset.array;
      this._popLang(table, $(ev.currentTarget).closest(".item").data("lang"));
    });

    //Toggle Equipment
    html.find(".item-toggle").click(async (ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      await item.update({
        data: {
          equipped: !item.data.data.equipped,
        },
      });
    });

    html.find("a[data-action='generate-scores']").click((ev) => {
      this.generateScores(ev);
    });
  }
}

/**
 * Extend the basic ActorSheet with some very simple modifications
 */
class OseActorSheetMonster extends OseActorSheet {
  constructor(...args) {
    super(...args);
  }

  /* -------------------------------------------- */

  /**
   * Extend and override the default options used by the 5e Actor Sheet
   * @returns {Object}
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["ose", "sheet", "monster", "actor"],
      template: `${OSE.systemPath()}/templates/actors/monster-sheet.html`,
      width: 450,
      height: 560,
      resizable: true,
      tabs: [
        {
          navSelector: ".tabs",
          contentSelector: ".sheet-body",
          initial: "attributes",
        },
      ],
    });
  }

  /**
   * Organize and classify Owned Items for Character sheets
   * @private
   */
  _prepareItems(data) {
    const itemsData = this.actor.data.items;
    const containerContents = {};
    const attackPatterns = {};

    // Partition items by category
    let [weapons, items, armors, spells, containers] = itemsData.reduce(
      (arr, item) => {
        // Classify items into types
        const containerId = item?.data?.data?.containerId;
        if (containerId) {
          containerContents[containerId] = [
            ...(containerContents[containerId] || []),
            item,
          ];
          return arr;
        }
        // Grab attack groups
        if (["weapon", "ability"].includes(item.type)) {
          if (attackPatterns[item.data.data.pattern] === undefined)
            attackPatterns[item.data.data.pattern] = [];
          attackPatterns[item.data.data.pattern].push(item);
        }
        // Classify items into types
        switch (item.type) {
          case "weapon":
            arr[0].push(item);
            break;
          case "item":
            arr[1].push(item);
            break;
          case "armor":
            arr[2].push(item);
            break;
          case "spell":
            arr[3].push(item);
            break;
          case "container":
            arr[4].push(item);
            break;
        }

        return arr;
      },
      [[], [], [], [], []]
    );

    // Sort spells by level
    var sortedSpells = {};
    var slots = {};
    for (var i = 0; i < spells.length; i++) {
      let lvl = spells[i].data.data.lvl;
      if (!sortedSpells[lvl]) sortedSpells[lvl] = [];
      if (!slots[lvl]) slots[lvl] = 0;
      slots[lvl] += spells[i].data.data.memorized;
      sortedSpells[lvl].push(spells[i]);
    }
    data.slots = {
      used: slots,
    };
    containers.map((container, key, arr) => {
      arr[key].data.data.itemIds = containerContents[container.id] || [];
      arr[key].data.data.totalWeight = containerContents[container.id]?.reduce(
        (acc, item) => {
          return (
            acc +
            item.data?.data?.weight * (item.data?.data?.quantity?.value || 1)
          );
        },
        0
      );
      return arr;
    });
    // Assign and return
    data.owned = {
      weapons: weapons,
      items: items,
      containers: containers,
      armors: armors,
    };
    data.attackPatterns = attackPatterns;
    data.spells = sortedSpells;
    [
      ...Object.values(data.attackPatterns),
      ...Object.values(data.owned),
      ...Object.values(data.spells),
    ].forEach((o) => o.sort((a, b) => (a.data.sort || 0) - (b.data.sort || 0)));
  }

  /**
   * Prepare data for rendering the Actor sheet
   * The prepared data object contains both the actor data as well as additional sheet options
   */
  getData() {
    const data = super.getData();
    // Prepare owned items
    this._prepareItems(data);

    // Settings
    data.config.morale = game.settings.get("ose", "morale");
    data.data.details.treasure.link = TextEditor.enrichHTML(
      data.data.details.treasure.table
    );
    data.isNew = this.actor.isNew();
    return data;
  }

  /**
   * Monster creation helpers
   */
  async generateSave() {
    let choices = CONFIG.OSE.monster_saves;

    let templateData = { choices: choices },
      dlg = await renderTemplate(
        `${OSE.systemPath()}/templates/actors/dialogs/monster-saves.html`,
        templateData
      );
    //Create Dialog window
    new Dialog(
      {
        title: game.i18n.localize("OSE.dialog.generateSaves"),
        content: dlg,
        buttons: {
          ok: {
            label: game.i18n.localize("OSE.Ok"),
            icon: '<i class="fas fa-check"></i>',
            callback: (html) => {
              let hd = html.find('input[name="hd"]').val();
              this.actor.generateSave(hd);
            },
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: game.i18n.localize("OSE.Cancel"),
          },
        },
        default: "ok",
      },
      {
        width: 250,
      }
    ).render(true);
  }

  async _onDrop(event) {
    super._onDrop(event);
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
      if (data.type !== "RollTable") return;
    } catch (err) {
      return false;
    }

    let link = "";
    if (data.pack) {
      let tableData = game.packs
        .get(data.pack)
        .index.filter((el) => el._id === data.id);
      link = `@Compendium[${data.pack}.${data.id}]{${tableData[0].name}}`;
    } else {
      link = `@RollTable[${data.id}]`;
    }
    this.actor.update({ "data.details.treasure.table": link });
  }

  /* -------------------------------------------- */
  async _resetAttacks(event) {
    const weapons = this.actor.data.items.filter((i) => i.type === "weapon");
    for (let wp of weapons) {
      const item = this.actor.items.get(wp.id);
      await item.update({
        data: {
          counter: {
            value: parseInt(wp.data.data.counter.max),
          },
        },
      });
    }
  }

  async _updateAttackCounter(event) {
    event.preventDefault();
    const item = this._getItemFromActor(event);

    if (event.target.dataset.field === "value") {
      return item.update({
        "data.counter.value": parseInt(event.target.value),
      });
    } else if (event.target.dataset.field === "max") {
      return item.update({
        "data.counter.max": parseInt(event.target.value),
      });
    }
  }

  _cycleAttackPatterns(event) {
    const item = super._getItemFromActor(event);
    let currentColor = item.data.data.pattern;
    let colors = Object.keys(CONFIG.OSE.colors);
    let index = colors.indexOf(currentColor);
    if (index + 1 == colors.length) {
      index = 0;
    } else {
      index++;
    }
    item.update({
      "data.pattern": colors[index],
    });
  }

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".morale-check a").click((ev) => {
      let actorObject = this.actor;
      actorObject.rollMorale({ event: ev });
    });

    html.find(".reaction-check a").click((ev) => {
      let actorObject = this.actor;
      actorObject.rollReaction({ event: ev });
    });

    html.find(".appearing-check a").click((ev) => {
      let actorObject = this.actor;
      let check = $(ev.currentTarget).closest(".check-field").data("check");
      actorObject.rollAppearing({ event: ev, check: check });
    });

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    html.find(".item-reset[data-action='reset-attacks']").click((ev) => {
      this._resetAttacks(ev);
    });

    html
      .find(".counter input")
      .click((ev) => ev.target.select())
      .change(this._updateAttackCounter.bind(this));

    html.find(".hp-roll").click((ev) => {
      this.actor.rollHP({ event: ev });
    });

    html.find(".item-pattern").click((ev) => this._cycleAttackPatterns(ev));

    html
      .find('button[data-action="generate-saves"]')
      .click(() => this.generateSave());
  }
}

const preloadHandlebarsTemplates = async function () {
  const templatePaths = [
    //Character Sheets
    `${OSE.systemPath()}/templates/actors/character-sheet.html`,
    `${OSE.systemPath()}/templates/actors/monster-sheet.html`,

    //Character Sheets Partials
    `${OSE.systemPath()}/templates/actors/partials/character-header.html`,
    `${OSE.systemPath()}/templates/actors/partials/character-attributes-tab.html`,
    `${OSE.systemPath()}/templates/actors/partials/character-abilities-tab.html`,
    `${OSE.systemPath()}/templates/actors/partials/character-spells-tab.html`,
    `${OSE.systemPath()}/templates/actors/partials/character-inventory-tab.html`,
    `${OSE.systemPath()}/templates/actors/partials/actor-item-summary.html`,
    `${OSE.systemPath()}/templates/actors/partials/character-notes-tab.html`,
    `${OSE.systemPath()}/templates/actors/partials/monster-header.html`,
    `${OSE.systemPath()}/templates/actors/partials/monster-attributes-tab.html`,

    // Item Display
    `${OSE.systemPath()}/templates/actors/partials/item-auto-tags-partial.html`,

    // Party Sheet
    `${OSE.systemPath()}/templates/apps/party-sheet.html`,
    `${OSE.systemPath()}/templates/apps/party-xp.html`,
  ];
  return loadTemplates(templatePaths);
};

/**
 * Override and extend the basic :class:`Item` implementation
 */
class OseItem extends Item {
  // Replacing default image */
  static get defaultIcons() {
    return {
      spell: "systems/ose/assets/default/spell.png",
      ability: "systems/ose/assets/default/ability.png",
      armor: "systems/ose/assets/default/armor.png",
      weapon: "systems/ose/assets/default/weapon.png",
      item: "systems/ose/assets/default/item.png",
      container: "systems/ose/assets/default/bag.png",
    };
  }

  static async create(data, context = {}) {
    if (data.img === undefined) {
      data.img = this.defaultIcons[data.type];
    }
    return super.create(data, context);
  }

  prepareData() {
    super.prepareData();
  }

  prepareDerivedData() {
    this.data.data.autoTags = this.getAutoTagList();
    this.data.data.manualTags = this.data.data.tags;
  }

  static chatListeners(html) {
    html.on("click", ".card-buttons button", this._onChatCardAction.bind(this));
    html.on("click", ".item-name", this._onChatCardToggleContent.bind(this));
  }

  getChatData(htmlOptions) {
    const data = duplicate(this.data.data);

    // Rich text description
    data.description = TextEditor.enrichHTML(data.description, htmlOptions);

    // Item properties
    const props = [];

    if (this.data.type == "weapon") {
      data.tags.forEach((t) => props.push(t.value));
    }
    if (this.data.type == "spell") {
      props.push(`${data.class} ${data.lvl}`, data.range, data.duration);
    }
    if (data.hasOwnProperty("equipped")) {
      props.push(data.equipped ? "Equipped" : "Not Equipped");
    }

    // Filter properties and return
    data.properties = props.filter((p) => !!p);
    return data;
  }

  rollWeapon(options = {}) {
    let isNPC = this.actor.data.type != "character";
    const data = this.data.data;
    let type = isNPC ? "attack" : "melee";
    const rollData = {
      item: this.data,
      actor: this.actor.data,
      roll: {
        save: this.data.data.save,
        target: null,
      },
    };

    if (data.missile && data.melee && !isNPC) {
      // Dialog
      new Dialog({
        title: "Choose Attack Range",
        content: "",
        buttons: {
          melee: {
            icon: '<i class="fas fa-fist-raised"></i>',
            label: "Melee",
            callback: () => {
              this.actor.targetAttack(rollData, "melee", options);
            },
          },
          missile: {
            icon: '<i class="fas fa-bullseye"></i>',
            label: "Missile",
            callback: () => {
              this.actor.targetAttack(rollData, "missile", options);
            },
          },
        },
        default: "melee",
      }).render(true);
      return true;
    } else if (data.missile && !isNPC) {
      type = "missile";
    }
    this.actor.targetAttack(rollData, type, options);
    return true;
  }

  async rollFormula(options = {}) {
    const data = this.data.data;
    if (!data.roll) {
      throw new Error("This Item does not have a formula to roll!");
    }

    const label = `${this.name}`;
    const rollParts = [data.roll];

    let type = data.rollType;

    const newData = {
      actor: this.actor.data,
      item: this.data,
      roll: {
        type: type,
        target: data.rollTarget,
        blindroll: data.blindroll,
      },
    };

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: newData,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("OSE.roll.formula", { label: label }),
      title: game.i18n.format("OSE.roll.formula", { label: label }),
    });
  }

  spendSpell() {
    this.update({
      data: {
        cast: this.data.data.cast - 1,
      },
    }).then(() => {
      this.show({ skipDialog: true });
    });
  }

  _getRollTag(data) {
    if (data.roll) {
      const roll = `${data.roll}${
        data.rollTarget ? CONFIG.OSE.roll_type[data.rollType] : ""
      }${data.rollTarget ? data.rollTarget : ""}`;
      return {
        label: `${game.i18n.localize("OSE.items.Roll")} ${roll}`,
      };
    } else {
      return;
    }
  }

  _getSaveTag(data) {
    if (data.save) {
      return {
        label: CONFIG.OSE.saves_long[data.save],
        icon: "fa-skull",
      };
    } else {
      return;
    }
  }

  getAutoTagList() {
    const tagList = [];
    const data = this.data.data;

    switch (this.data.type) {
      case "container":
      case "item":
        break;
      case "weapon":
        tagList.push({ label: data.damage, icon: "fa-tint" });
        if (data.missile) {
          tagList.push({
            label: `${data.range.short}/${data.range.medium}/${data.range.long}`,
            icon: "fa-bullseye",
          });
        }

        // Push manual tags
        data.tags.forEach((t) => {
          tagList.push({ label: t.value });
        });
        break;
      case "armor":
        tagList.push({ label: CONFIG.OSE.armor[data.type], icon: "fa-tshirt" });
        break;
      case "spell":
        tagList.push(
          { label: data.class },
          { label: data.range },
          { label: data.duration }
        );
        break;
      case "ability":
        const reqs = data.requirements.split(",");
        reqs.forEach((req) => tagList.push({ label: req }));
        break;
    }

    const rollTag = this._getRollTag(data);
    if (rollTag) {
      tagList.push(rollTag);
    }

    const saveTag = this._getSaveTag(data);
    if (saveTag) {
      tagList.push(saveTag);
    }

    return tagList;
  }

  pushManualTag(values) {
    const data = this.data.data;
    let update = [];
    if (data.tags) {
      update = duplicate(data.tags);
    }
    let newData = {};
    var regExp = /\(([^)]+)\)/;
    if (update) {
      values.forEach((val) => {
        // Catch infos in brackets
        var matches = regExp.exec(val);
        let title = "";
        if (matches) {
          title = matches[1];
          val = val.substring(0, matches.index).trim();
        } else {
          val = val.trim();
          title = val;
        }
        // Auto fill checkboxes
        switch (val) {
          case CONFIG.OSE.tags.melee:
            newData.melee = true;
            break;
          case CONFIG.OSE.tags.slow:
            newData.slow = true;
            break;
          case CONFIG.OSE.tags.missile:
            newData.missile = true;
            break;
        }
        update.push({ title: title, value: val });
      });
    } else {
      update = values;
    }
    newData.tags = update;
    return this.update({ data: newData });
  }

  popManualTag(value) {
    const tags = this.data.data.tags;
    if (!tags) return;

    let update = tags.filter((el) => el.value != value);
    let newData = {
      tags: update,
    };
    return this.update({ data: newData });
  }

  roll(options = {}) {
    switch (this.type) {
      case "weapon":
        this.rollWeapon(options);
        break;
      case "spell":
        this.spendSpell(options);
        break;
      case "ability":
        if (this.data.data.roll) {
          this.rollFormula();
        } else {
          this.show();
        }
        break;
      case "item":
      case "armor":
        this.show();
    }
  }

  /**
   * Show the item to Chat, creating a chat card which contains follow up attack or damage roll options
   * @return {Promise}
   */
  async show() {
    // Basic template rendering data
    const token = this.actor.token;
    const templateData = {
      actor: this.actor,
      tokenId: token ? `${token.parent.id}.${token.id}` : null,
      item: foundry.utils.duplicate(this.data),
      data: this.getChatData(),
      labels: this.labels,
      isHealing: this.isHealing,
      hasDamage: this.hasDamage,
      isSpell: this.data.type === "spell",
      hasSave: this.hasSave,
      config: CONFIG.OSE,
    };
    templateData.data.properties = this.getAutoTagList();

    // Render the chat card template
    const template = `${OSE.systemPath()}/templates/chat/item-card.html`;
    const html = await renderTemplate(template, templateData);

    // Basic chat message data
    const chatData = {
      user: game.user.id,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: html,
      speaker: {
        actor: this.actor.id,
        token: this.actor.token,
        alias: this.actor.name,
      },
    };

    // Toggle default roll mode
    let rollMode = game.settings.get("core", "rollMode");
    if (["gmroll", "blindroll"].includes(rollMode))
      chatData["whisper"] = ChatMessage.getWhisperRecipients("GM");
    if (rollMode === "selfroll") chatData["whisper"] = [game.user.id];
    if (rollMode === "blindroll") chatData["blind"] = true;

    // Create the chat message
    return ChatMessage.create(chatData);
  }

  /**
   * Handle toggling the visibility of chat card content when the name is clicked
   * @param {Event} event   The originating click event
   * @private
   */
  static _onChatCardToggleContent(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const card = header.closest(".chat-card");
    const content = card.querySelector(".card-content");
    if (content.style.display == "none") {
      $(content).slideDown(200);
    } else {
      $(content).slideUp(200);
    }
  }

  static async _onChatCardAction(event) {
    event.preventDefault();

    // Extract card data
    const button = event.currentTarget;
    button.disabled = true;
    const card = button.closest(".chat-card");
    const messageId = card.closest(".message").dataset.messageId;
    const message = game.messages.get(messageId);
    const action = button.dataset.action;

    // Validate permission to proceed with the roll
    const isTargetted = action === "save";
    if (!(isTargetted || game.user.isGM || message.isAuthor)) return;

    // Get the Actor from a synthetic Token
    const actor = this._getChatCardActor(card);
    if (!actor) return;

    // Get the Item
    const item = actor.items.get(card.dataset.itemId);
    if (!item) {
      return ui.notifications.error(
        `The requested item ${card.dataset.itemId} no longer exists on Actor ${actor.name}`
      );
    }

    // Get card targets
    let targets = [];
    if (isTargetted) {
      targets = this._getChatCardTargets(card);
    }

    // Attack and Damage Rolls
    if (action === "damage") await item.rollDamage({ event });
    else if (action === "formula") await item.rollFormula({ event });
    // Saving Throws for card targets
    else if (action == "save") {
      if (!targets.length) {
        ui.notifications.warn(
          `You must have one or more controlled Tokens in order to use this option.`
        );
        return (button.disabled = false);
      }
      for (let t of targets) {
        await t.rollSave(button.dataset.save, { event });
      }
    }

    // Re-enable the button
    button.disabled = false;
  }

  static _getChatCardActor(card) {
    // Case 1 - a synthetic actor from a Token
    const tokenKey = card.dataset.tokenId;
    if (tokenKey) {
      const [sceneId, tokenId] = tokenKey.split(".");
      const scene = game.scenes.get(sceneId);
      if (!scene) return null;
      const tokenData = scene.getEmbeddedDocument("Token", tokenId);
      if (!tokenData) return null;
      const token = new Token(tokenData);
      return token.actor;
    }

    // Case 2 - use Actor ID directory
    const actorId = card.dataset.actorId;
    return game.actors.get(actorId) || null;
  }

  static _getChatCardTargets(card) {
    const character = game.user.character;
    const controlled = canvas.tokens.controlled;
    const targets = controlled.reduce(
      (arr, t) => (t.actor ? arr.concat([t.actor]) : arr),
      []
    );
    if (character && controlled.length === 0) targets.push(character);
    return targets;
  }
}

class OseActor extends Actor {
  /**
   * Extends data from base Actor class
   */

  prepareData() {
    super.prepareData();
    const data = this.data.data;

    // Compute modifiers from actor scores
    this.computeModifiers();
    this._isSlow();
    this.computeAC();
    this.computeEncumbrance();
    this.computeTreasure();

    // Determine Initiative
    if (game.settings.get("ose", "initiative") != "group") {
      data.initiative.value = data.initiative.mod;
      if (this.data.type == "character") {
        data.initiative.value += data.scores.dex.init;
      }
    } else {
      data.initiative.value = 0;
    }
    data.movement.encounter = Math.floor(data.movement.base / 3);
  }

  static async update(data, options = {}) {
    // Compute AAC from AC
    if (data.data?.ac?.value) {
      data.data.aac = { value: 19 - data.data.ac.value };
    } else if (data.data?.aac?.value) {
      data.data.ac = { value: 19 - data.data.aac.value };
    }

    // Compute Thac0 from BBA
    if (data.data?.thac0?.value) {
      data.data.thac0.bba = 19 - data.data.thac0.value;
    } else if (data.data?.thac0?.bba) {
      data.data.thac0.value = 19 - data.data.thac0.bba;
    }

    super.update(data, options);
  }

  async createEmbeddedDocuments(embeddedName, data = [], context = {}) {
    data.map((item) => {
      if (item.img === undefined) {
        item.img = OseItem.defaultIcons[item.type];
      }
    });
    return super.createEmbeddedDocuments(embeddedName, data, context);
  }

  /* -------------------------------------------- */
  /*  Socket Listeners and Handlers
    /* -------------------------------------------- */
  getExperience(value, options = {}) {
    if (this.data.type != "character") {
      return;
    }
    let modified = Math.floor(
      value + (this.data.data.details.xp.bonus * value) / 100
    );
    return this.update({
      "data.details.xp.value": modified + this.data.data.details.xp.value,
    }).then(() => {
      const speaker = ChatMessage.getSpeaker({ actor: this });
      ChatMessage.create({
        content: game.i18n.format("OSE.messages.GetExperience", {
          name: this.name,
          value: modified,
        }),
        speaker,
      });
    });
  }

  isNew() {
    const data = this.data.data;
    if (this.data.type == "character") {
      let ct = 0;
      Object.values(data.scores).forEach((el) => {
        ct += el.value;
      });
      return ct == 0 ? true : false;
    } else if (this.data.type == "monster") {
      let ct = 0;
      Object.values(data.saves).forEach((el) => {
        ct += el.value;
      });
      return ct == 0 ? true : false;
    }
  }

  generateSave(hd) {
    let saves = {};
    for (let i = 0; i <= hd; i++) {
      let tmp = CONFIG.OSE.monster_saves[i];
      if (tmp) {
        saves = tmp;
      }
    }
    // Compute Thac0
    let thac0 = 20;
    Object.keys(CONFIG.OSE.monster_thac0).forEach((k) => {
      if (parseInt(hd) < parseInt(k)) {
        return;
      }
      thac0 = CONFIG.OSE.monster_thac0[k];
    });
    this.update({
      "data.thac0.value": thac0,
      "data.saves": {
        death: {
          value: saves.d,
        },
        wand: {
          value: saves.w,
        },
        paralysis: {
          value: saves.p,
        },
        breath: {
          value: saves.b,
        },
        spell: {
          value: saves.s,
        },
      },
    });
  }

  /* -------------------------------------------- */
  /*  Rolls                                       */
  /* -------------------------------------------- */

  rollHP(options = {}) {
    let roll = new Roll(this.data.data.hp.hd).roll({ async: false });
    return this.update({
      data: {
        hp: {
          max: roll.total,
          value: roll.total,
        },
      },
    });
  }

  rollSave(save, options = {}) {
    const label = game.i18n.localize(`OSE.saves.${save}.long`);
    const rollParts = ["1d20"];

    const data = {
      actor: this.data,
      roll: {
        type: "above",
        target: this.data.data.saves[save].value,
        magic:
          this.data.type === "character" ? this.data.data.scores.wis.mod : 0,
      },
      details: game.i18n.format("OSE.roll.details.save", { save: label }),
    };

    let skip = options?.event?.ctrlKey || options.fastForward;

    const rollMethod =
      this.data.type == "character" ? OseDice.RollSave : OseDice.Roll;

    // Roll and return
    return rollMethod({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: skip,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("OSE.roll.save", { save: label }),
      title: game.i18n.format("OSE.roll.save", { save: label }),
      chatMessage: options.chatMessage,
    });
  }

  rollMorale(options = {}) {
    const rollParts = ["2d6"];

    const data = {
      actor: this.data,
      roll: {
        type: "below",
        target: this.data.data.details.morale,
      },
    };

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.localize("OSE.roll.morale"),
      title: game.i18n.localize("OSE.roll.morale"),
    });
  }

  rollLoyalty(options = {}) {
    const label = game.i18n.localize(`OSE.roll.loyalty`);
    const rollParts = ["2d6"];

    const data = {
      actor: this.data,
      roll: {
        type: "below",
        target: this.data.data.retainer.loyalty,
      },
    };

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: label,
      title: label,
    });
  }

  rollReaction(options = {}) {
    const rollParts = ["2d6"];

    const data = {
      actor: this.data,
      roll: {
        type: "table",
        table: {
          2: game.i18n.format("OSE.reaction.Hostile", {
            name: this.data.name,
          }),
          3: game.i18n.format("OSE.reaction.Unfriendly", {
            name: this.data.name,
          }),
          6: game.i18n.format("OSE.reaction.Neutral", {
            name: this.data.name,
          }),
          9: game.i18n.format("OSE.reaction.Indifferent", {
            name: this.data.name,
          }),
          12: game.i18n.format("OSE.reaction.Friendly", {
            name: this.data.name,
          }),
        },
      },
    };

    let skip =
      options.event && (options.event.ctrlKey || options.event.metaKey);

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: skip,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.localize("OSE.reaction.check"),
      title: game.i18n.localize("OSE.reaction.check"),
    });
  }

  rollCheck(score, options = {}) {
    if (this.data.type !== "character") return;

    const label = game.i18n.localize(`OSE.scores.${score}.long`);
    const rollParts = ["1d20"];

    const data = {
      actor: this.data,
      roll: {
        type: "check",
        target: this.data.data.scores[score].value,
      },

      details: game.i18n.format("OSE.roll.details.attribute", {
        score: label,
      }),
    };

    let skip = options?.event?.ctrlKey || options.fastForward;

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: skip,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("OSE.roll.attribute", { attribute: label }),
      title: game.i18n.format("OSE.roll.attribute", { attribute: label }),
      chatMessage: options.chatMessage,
    });
  }

  rollHitDice(options = {}) {
    const label = game.i18n.localize(`OSE.roll.hd`);
    const rollParts = [this.data.data.hp.hd];
    if (this.data.type == "character") {
      rollParts.push(this.data.data.scores.con.mod);
    }

    const data = {
      actor: this.data,
      roll: {
        type: "hitdice",
      },
    };

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: label,
      title: label,
    });
  }

  rollAppearing(options = {}) {
    if (this.data.type !== "monster") return;

    const rollParts = [];
    let label = "";
    if (options.check == "wilderness") {
      rollParts.push(this.data.data.details.appearing.w);
      label = "(2)";
    } else {
      rollParts.push(this.data.data.details.appearing.d);
      label = "(1)";
    }
    const data = {
      actor: this.data,
      roll: {
        type: {
          type: "appearing",
        },
      },
    };

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("OSE.roll.appearing", { type: label }),
      title: game.i18n.format("OSE.roll.appearing", { type: label }),
    });
  }

  rollExploration(expl, options = {}) {
    if (this.data.type !== "character") return;

    const label = game.i18n.localize(`OSE.exploration.${expl}.long`);
    const rollParts = ["1d6"];

    const data = {
      actor: this.data,
      roll: {
        type: "below",
        target: this.data.data.exploration[expl],
        blindroll: true,
      },
      details: game.i18n.format("OSE.roll.details.exploration", {
        expl: label,
      }),
    };

    let skip =
      options.event && (options.event.ctrlKey || options.event.metaKey);

    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: data,
      skipDialog: skip,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: game.i18n.format("OSE.roll.exploration", { exploration: label }),
      title: game.i18n.format("OSE.roll.exploration", { exploration: label }),
    });
  }

  rollDamage(attData, options = {}) {
    const data = this.data.data;

    const rollData = {
      actor: this.data,
      item: attData.item,
      roll: {
        type: "damage",
      },
    };

    let dmgParts = [];
    if (!attData.roll.dmg) {
      dmgParts.push("1d6");
    } else {
      dmgParts.push(attData.roll.dmg);
    }

    // Add Str to damage
    if (attData.roll.type == "melee") {
      dmgParts.push(data.scores.str.mod);
    }

    // Damage roll
    OseDice.Roll({
      event: options.event,
      parts: dmgParts,
      data: rollData,
      skipDialog: true,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${attData.label} - ${game.i18n.localize("OSE.Damage")}`,
      title: `${attData.label} - ${game.i18n.localize("OSE.Damage")}`,
    });
  }

  async targetAttack(data, type, options) {
    if (game.user.targets.size > 0) {
      for (let t of game.user.targets.values()) {
        data.roll.target = t;
        await this.rollAttack(data, {
          type: type,
          skipDialog: options.skipDialog,
        });
      }
    } else {
      this.rollAttack(data, { type: type, skipDialog: options.skipDialog });
    }
  }

  rollAttack(attData, options = {}) {
    const data = this.data.data;
    const rollParts = ["1d20"];
    const dmgParts = [];
    let label = game.i18n.format("OSE.roll.attacks", {
      name: this.data.name,
    });
    if (!attData.item) {
      dmgParts.push("1d6");
    } else {
      label = game.i18n.format("OSE.roll.attacksWith", {
        name: attData.item.name,
      });
      dmgParts.push(attData.item.data.damage);
    }

    let ascending = game.settings.get("ose", "ascendingAC");
    if (ascending) {
      rollParts.push(data.thac0.bba.toString());
    }
    if (options.type == "missile") {
      rollParts.push(
        data.scores.dex.mod.toString(),
        data.thac0.mod.missile.toString()
      );
    } else if (options.type == "melee") {
      rollParts.push(
        data.scores.str.mod.toString(),
        data.thac0.mod.melee.toString()
      );
    }
    if (attData.item && attData.item.data.bonus) {
      rollParts.push(attData.item.data.bonus);
    }
    let thac0 = data.thac0.value;
    if (options.type == "melee") {
      dmgParts.push(data.scores.str.mod);
    }
    const rollData = {
      actor: this.data,
      item: attData.item,
      itemId: attData.item?._id,
      roll: {
        type: options.type,
        thac0: thac0,
        dmg: dmgParts,
        save: attData.roll.save,
        target: attData.roll.target,
      },
    };
    // Roll and return
    return OseDice.Roll({
      event: options.event,
      parts: rollParts,
      data: rollData,
      skipDialog: options.skipDialog,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: label,
      flags: { ose: { roll: "attack", itemId: attData.item?._id } },
      title: label,
    });
  }

  async applyDamage(amount = 0, multiplier = 1) {
    amount = Math.floor(parseInt(amount) * multiplier);
    const hp = this.data.data.hp;

    // Remaining goes to health
    const dh = Math.clamped(hp.value - amount, 0, hp.max);

    // Update the Actor
    return this.update({
      "data.hp.value": dh,
    });
  }

  static _valueFromTable(table, val) {
    let output;
    for (let i = 0; i <= val; i++) {
      if (table[i] != undefined) {
        output = table[i];
      }
    }
    return output;
  }

  _isSlow() {
    this.data.data.isSlow = ![...this.data.items.values()].every((item) => {
      if (
        item.type !== "weapon" ||
        !item.data.data.slow ||
        !item.data.data.equipped
      ) {
        return true;
      }
      return false;
    });
  }

  computeEncumbrance() {
    if (this.data.type != "character") {
      return;
    }
    const data = this.data.data;
    const option = game.settings.get("ose", "encumbranceOption");
    const items = [...this.data.items.values()];
    // Compute encumbrance
    const hasAdventuringGear = items.some((item) => {
      return item.type === "item" && !item.data.data.treasure;
    });

    let totalWeight = items.reduce((acc, item) => {
      if (
        item.type === "item" &&
        (["complete", "disabled"].includes(option) || item.data.data.treasure)
      ) {
        return acc + item.data.data.quantity.value * item.data.data.weight;
      }
      if (
        ["weapon", "armor", "container"].includes(item.type) &&
        option !== "basic"
      ) {
        return acc + item.data.data.weight;
      }
      return acc;
    }, 0);

    if (option === "detailed" && hasAdventuringGear) totalWeight += 80;

    // Compute weigth thresholds
    const max = data.encumbrance.max;
    const basicSignificantEncumbrance = game.settings.get(
      "ose",
      "significantTreasure"
    );

    const steps = ["detailed", "complete"].includes(option)
      ? [400, 600, 800]
      : option === "basic"
      ? [basicSignificantEncumbrance]
      : [];

    const percentSteps = steps.map((s) => (100 * s) / max);

    data.encumbrance = {
      pct: Math.clamped((100 * parseFloat(totalWeight)) / max, 0, 100),
      max: max,
      encumbered: totalWeight > data.encumbrance.max,
      value: totalWeight,
      steps: percentSteps,
    };

    if (data.config.movementAuto && option != "disabled") {
      this._calculateMovement();
    }
  }

  _calculateMovement() {
    const data = this.data.data;
    const option = game.settings.get("ose", "encumbranceOption");
    const weight = data.encumbrance.value;
    const delta = data.encumbrance.max - 1600;
    if (["detailed", "complete"].includes(option)) {
      if (weight >= data.encumbrance.max) {
        data.movement.base = 0;
      } else if (weight > 800 + delta) {
        data.movement.base = 30;
      } else if (weight > 600 + delta) {
        data.movement.base = 60;
      } else if (weight > 400 + delta) {
        data.movement.base = 90;
      } else {
        data.movement.base = 120;
      }
    } else if (option === "basic") {
      const armors = this.data.items.filter((i) => i.type === "armor");
      let heaviest = 0;
      armors.forEach((a) => {
        const armorData = a.data.data;
        const weight = armorData.type;
        const equipped = armorData.equipped;
        if (equipped) {
          if (weight === "light" && heaviest === 0) {
            heaviest = 1;
          } else if (weight === "heavy") {
            heaviest = 2;
          }
        }
      });
      switch (heaviest) {
        case 0:
          data.movement.base = 120;
          break;
        case 1:
          data.movement.base = 90;
          break;
        case 2:
          data.movement.base = 60;
          break;
      }
      if (weight >= data.encumbrance.max) {
        data.movement.base = 0;
      } else if (weight >= game.settings.get("ose", "significantTreasure")) {
        data.movement.base -= 30;
      }
    }
  }

  computeTreasure() {
    if (this.data.type != "character") {
      return;
    }
    const data = this.data.data;
    // Compute treasure
    let total = 0;
    let treasure = this.data.items.filter(
      (i) => i.type == "item" && i.data.data.treasure
    );
    treasure.forEach((item) => {
      total += item.data.data.quantity.value * item.data.data.cost;
    });
    data.treasure = Math.round(total * 100) / 100.0;
  }

  computeAC() {
    if (this.data.type != "character") {
      return;
    }
    const data = this.data.data;

    // Compute AC
    let baseAc = 9;
    let baseAac = 9;
    let AcShield = 0;
    let AacShield = 0;

    data.aac.naked = baseAac + data.scores.dex.mod;
    data.ac.naked = baseAc - data.scores.dex.mod;
    const armors = this.data.items.filter((i) => i.type == "armor");
    armors.forEach((a) => {
      const armorData = a.data.data;
      if (!armorData.equipped) return;
      if (armorData.type == "shield") {
        AcShield = armorData.ac.value;
        AacShield = armorData.aac.value;
        return;
      }
      baseAc = armorData.ac.value;
      baseAac = armorData.aac.value;
    });
    data.aac.value = baseAac + data.scores.dex.mod + AacShield + data.aac.mod;
    data.ac.value = baseAc - data.scores.dex.mod - AcShield - data.ac.mod;
    data.ac.shield = AcShield;
    data.aac.shield = AacShield;
  }

  computeModifiers() {
    if (this.data.type != "character") {
      return;
    }
    const data = this.data.data;

    const standard = {
      0: -3,
      3: -3,
      4: -2,
      6: -1,
      9: 0,
      13: 1,
      16: 2,
      18: 3,
    };
    data.scores.str.mod = OseActor._valueFromTable(
      standard,
      data.scores.str.value
    );
    data.scores.int.mod = OseActor._valueFromTable(
      standard,
      data.scores.int.value
    );
    data.scores.dex.mod = OseActor._valueFromTable(
      standard,
      data.scores.dex.value
    );
    data.scores.cha.mod = OseActor._valueFromTable(
      standard,
      data.scores.cha.value
    );
    data.scores.wis.mod = OseActor._valueFromTable(
      standard,
      data.scores.wis.value
    );
    data.scores.con.mod = OseActor._valueFromTable(
      standard,
      data.scores.con.value
    );

    const capped = {
      0: -2,
      3: -2,
      4: -1,
      6: -1,
      9: 0,
      13: 1,
      16: 1,
      18: 2,
    };
    data.scores.dex.init = OseActor._valueFromTable(
      capped,
      data.scores.dex.value
    );
    data.scores.cha.npc = OseActor._valueFromTable(
      capped,
      data.scores.cha.value
    );
    data.scores.cha.retain = data.scores.cha.mod + 4;
    data.scores.cha.loyalty = data.scores.cha.mod + 7;

    const od = {
      0: 0,
      3: 1,
      9: 2,
      13: 3,
      16: 4,
      18: 5,
    };
    data.exploration.odMod = OseActor._valueFromTable(
      od,
      data.scores.str.value
    );

    const literacy = {
      0: "",
      3: "OSE.Illiterate",
      6: "OSE.LiteracyBasic",
      9: "OSE.Literate",
    };
    data.languages.literacy = OseActor._valueFromTable(
      literacy,
      data.scores.int.value
    );

    const spoken = {
      0: "OSE.NativeBroken",
      3: "OSE.Native",
      13: "OSE.NativePlus1",
      16: "OSE.NativePlus2",
      18: "OSE.NativePlus3",
    };
    data.languages.spoken = OseActor._valueFromTable(
      spoken,
      data.scores.int.value
    );
  }
}

const registerSettings = function () {

  game.settings.register("ose", "initiative", {
    name: game.i18n.localize("OSE.Setting.Initiative"),
    hint: game.i18n.localize("OSE.Setting.InitiativeHint"),
    default: "group",
    scope: "world",
    type: String,
    config: true,
    choices: {
      individual: "OSE.Setting.InitiativeIndividual",
      group: "OSE.Setting.InitiativeGroup",
    },
  });

  game.settings.register("ose", "rerollInitiative", {
    name: game.i18n.localize("OSE.Setting.RerollInitiative"),
    hint: game.i18n.localize("OSE.Setting.RerollInitiativeHint"),
    default: "reset",
    scope: "world",
    type: String,
    config: true,
    choices: {
      keep: "OSE.Setting.InitiativeKeep",
      reset: "OSE.Setting.InitiativeReset",
      reroll: "OSE.Setting.InitiativeReroll",
    }
  });

  game.settings.register("ose", "ascendingAC", {
    name: game.i18n.localize("OSE.Setting.AscendingAC"),
    hint: game.i18n.localize("OSE.Setting.AscendingACHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
  });

  game.settings.register("ose", "morale", {
    name: game.i18n.localize("OSE.Setting.Morale"),
    hint: game.i18n.localize("OSE.Setting.MoraleHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
  });

  game.settings.register("ose", "encumbranceOption", {
    name: game.i18n.localize("OSE.Setting.Encumbrance"),
    hint: game.i18n.localize("OSE.Setting.EncumbranceHint"),
    default: "detailed",
    scope: "world",
    type: String,
    config: true,
    choices: {
      disabled: "OSE.Setting.EncumbranceDisabled",
      basic: "OSE.Setting.EncumbranceBasic",
      detailed: "OSE.Setting.EncumbranceDetailed",
      complete: "OSE.Setting.EncumbranceComplete",
    },
  });

  game.settings.register("ose", "significantTreasure", {
    name: game.i18n.localize("OSE.Setting.SignificantTreasure"),
    hint: game.i18n.localize("OSE.Setting.SignificantTreasureHint"),
    default: 800,
    scope: "world",
    type: Number,
    config: true,
  });

  game.settings.register("ose", "languages", {
    name: game.i18n.localize("OSE.Setting.Languages"),
    hint: game.i18n.localize("OSE.Setting.LanguagesHint"),
    default: "",
    scope: "world",
    type: String,
    config: true,
  });
   game.settings.register('ose', 'applyDamageOption', {
    name: game.i18n.localize('OSE.Setting.applyDamageOption'),
    hint: game.i18n.localize('OSE.Setting.applyDamageOptionHint'),
    default: 'selected',
    scope: 'world',
    type: String,
    config: true,
    choices: {
      selected: 'OSE.Setting.damageSelected',
      targeted: 'OSE.Setting.damageTarget'
    },
  });
};

const registerHelpers = async function () {
  // Handlebars template helpers
  Handlebars.registerHelper("eq", function (a, b) {
    return a == b;
  });

  Handlebars.registerHelper("mod", function (val) {
    if (val > 0) {
      return `+${val}`;
    } else if (val < 0) {
      return `${val}`;
    } else {
      return "0";
    }
  });

  Handlebars.registerHelper("add", function (lh, rh) {
    return parseInt(lh) + parseInt(rh);
  });

  Handlebars.registerHelper("subtract", function (lh, rh) {
    return parseInt(lh) - parseInt(rh);
  });

  Handlebars.registerHelper("divide", function (lh, rh) {
    return Math.floor(parseFloat(lh) / parseFloat(rh));
  });

  Handlebars.registerHelper("mult", function (lh, rh) {
    return Math.round(100 * parseFloat(lh) * parseFloat(rh)) / 100;
  });

  Handlebars.registerHelper("roundWeight", function (weight) {
    return Math.round(parseFloat(weight) / 100) / 10;
  });

  Handlebars.registerHelper("getTagIcon", function (tag) {
    let idx = Object.keys(CONFIG.OSE.tags).find(
      (k) => CONFIG.OSE.tags[k] == tag
    );
    return CONFIG.OSE.tag_images[idx];
  });

  Handlebars.registerHelper("counter", function (status, value, max) {
    return status
      ? Math.clamped((100.0 * value) / max, 0, 100)
      : Math.clamped(100 - (100.0 * value) / max, 0, 100);
  });

  Handlebars.registerHelper("times", function (n, block) {
    var accum = "";
    for (let i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
  });

  Handlebars.registerHelper("path", function (relativePath) {
    return `${OSE.systemPath()}${relativePath}`;
  });

  // helper for parsing inline rolls
  Handlebars.registerHelper("parseInline", function (html) {
    return TextEditor.enrichHTML(html)
  });
};

const registerFVTTModuleAPIs = () => {
  // see docs for more info https://github.com/fantasycalendar/FoundryVTT-ItemPiles/blob/master/docs/api.md
  Hooks.once("item-piles-ready", async function () {
    if (ItemPiles.API.ACTOR_CLASS_TYPE !== "character")
      ItemPiles.API.setActorClassType("character");
    if (ItemPiles.API.ITEM_QUANTITY_ATTRIBUTE !== "data.quantity.value")
      ItemPiles.API.setItemQuantityAttribute("data.quantity.value");
    if (
      ItemPiles.API.ITEM_FILTERS !==
      [
        {
          path: "type",
          filters: "spell,ability",
        },
      ]
    )
      ItemPiles.API.setItemFilters([
        {
          path: "type",
          filters: "spell,ability",
        },
      ]);
  });
};

/**
 * This function is used to hook into the Chat Log context menu to add additional options to each message
 * These options make it easy to conveniently apply damage to controlled tokens based on the value of a Roll
 *
 * @param {HTMLElement} html    The Chat Message being rendered
 * @param {Array} options       The Array of Context Menu options
 *
 * @return {Array}              The extended options Array including new context choices
 */
const addChatMessageContextOptions = function (html, options) {
  let canApply = (li) =>
    canvas.tokens.controlled.length && li.find(".dice-roll").length;
  options.push(
    {
      name: game.i18n.localize("OSE.messages.applyDamage"),
      icon: '<i class="fas fa-user-minus"></i>',
      condition: canApply,
      callback: (li) => applyChatCardDamage(li, 1),
    },
    {
      name: game.i18n.localize("OSE.messages.applyHealing"),
      icon: '<i class="fas fa-user-plus"></i>',
      condition: canApply,
      callback: (li) => applyChatCardDamage(li, -1),
    }
  );
  return options;
};

/* -------------------------------------------- */

const addChatMessageButtons = function (msg, html, data) {
  // Hide blind rolls
  let blindable = html.find(".blindable");
  if (
    msg.data.blind &&
    !game.user.isGM &&
    blindable &&
    blindable.data("blind") === true
  ) {
    blindable.replaceWith(
      "<div class='dice-roll'><div class='dice-result'><div class='dice-formula'>???</div></div></div>"
    );
  }
  // Buttons
  let roll = html.find(".damage-roll");
  if (roll.length > 0) {
    let total = roll.find(".dice-total");
    total.text();
    roll.append(
      $(
        `<div class="dice-damage"><button type="button" data-action="apply-damage"><i class="fas fa-tint"></i></button></div>`
      )
    );
    roll.find('button[data-action="apply-damage"]').click((ev) => {
      ev.preventDefault();
      applyChatCardDamage(roll, 1);
    });
  }
};

/**
 * Apply rolled dice damage to the token or tokens which are currently controlled.
 * This allows for damage to be scaled by a multiplier to account for healing, critical hits, or resistance
 *
 * @param {HTMLElement} roll    The chat entry which contains the roll data
 * @param {Number} multiplier   A damage multiplier to apply to the rolled damage.
 * @return {Promise}
 */
function applyChatCardDamage(roll, multiplier) {
  const amount = roll.find(".dice-total").last().text();
  const dmgTgt = game.settings.get("ose", "applyDamageOption");
  if (dmgTgt === `targeted`) {
    game.user.targets.forEach(async (t) => {
      if (game.user.isGM) return await t.actor.applyDamage(amount, multiplier);
    });
  }
  if (dmgTgt === `selected`) {
    canvas.tokens.controlled.forEach(async (t) => {
      if (game.user.isGM) return await t.actor.applyDamage(amount, multiplier);
    });
  }
}

/* -------------------------------------------- */

const augmentTable = (table, html, data) => {
  // Treasure Toggle
  const isTreasureTable = Boolean(table.object.getFlag("ose", "treasure"));

  let treasureTableToggle = $(
    "<div class='toggle-treasure' title='Toggle Treasure Table'></div>"
  );
  treasureTableToggle.toggleClass("active", isTreasureTable);

  let head = html.find(".sheet-header");
  head.append(treasureTableToggle);

  html.find(".toggle-treasure").click((ev) => {
    const isTreasure = Boolean(table.object.getFlag("ose", "treasure"));
    table.object.setFlag("ose", "treasure", !isTreasure);
  });

  // Treasure table formatting
  if (!isTreasureTable) {
    return;
  }

  // Hide irrelevant standard fields
  html.find(".result-range").hide(); // We only hide this column because the underlying model requires two fields for the range and throw an error if they are missing
  html.find(".normalize-results").remove();

  let chanceHeader = html.find(".table-header .result-weight");
  chanceHeader.text("Chance (%)");

  let chanceColumn = html.find(".result-weight");
  chanceColumn.css("flex", "0 0 75px");

  let formula = html.find("input[name=formula]");
  formula.attr("value", "1d100");
  formula.attr("disabled", true);

  // Replace Roll button
  const roll = `<button class="roll-treasure" type="button"><i class="fas fa-gem"></i> ${game.i18n.localize(
    "OSE.table.treasure.roll"
  )}</button>`;
  html.find(".sheet-footer .roll").replaceWith(roll);

  html.find(".roll-treasure").click((ev) => {
    rollTreasure(table.object, { event: ev });
  });
};

function drawTreasure(table, data) {
  const percent = (chance) => {
    const roll = new Roll("1d100");
    roll.evaluate({ async: false });
    return roll.total <= chance;
  };
  data.treasure = {};
  if (table.getFlag("ose", "treasure")) {
    table.results.forEach((r) => {
      if (percent(r.data.weight)) {
        const text = r.getChatText(r);
        data.treasure[r.id] = {
          img: r.data.img,
          text: TextEditor.enrichHTML(text),
        };
        if (
          r.data.type === CONST.TABLE_RESULT_TYPES.DOCUMENT &&
          r.data.collection === "RollTable"
        ) {
          const embeddedTable = game.tables.get(r.data.resultId);
          drawTreasure(embeddedTable, data.treasure[r.id]);
        }
      }
    });
  } else {
    const results = table.evaluate({ async: false }).results;
    results.forEach((s) => {
      const text = TextEditor.enrichHTML(table._getResultChatText(s));
      data.treasure[s.id] = { img: s.data.img, text: text };
    });
  }
  return data;
}

async function rollTreasure(table, options = {}) {
  // Draw treasure
  const data = drawTreasure(table, {});
  let templateData = {
    treasure: data.treasure,
    table: table,
  };

  // Animation
  if (options.event) {
    let results = $(options.event.currentTarget.parentElement)
      .prev()
      .find(".table-result");
    results.each((_, item) => {
      item.classList.remove("active");
      if (data.treasure[item.dataset.resultId]) {
        item.classList.add("active");
      }
    });
  }

  let html = await renderTemplate(
    `${OSE.systemPath()}/templates/chat/roll-treasure.html`,
    templateData
  );

  let chatData = {
    content: html,
    // sound: "systems/ose/assets/coins.mp3"
  };

  let rollMode = game.settings.get("core", "rollMode");
  if (["gmroll", "blindroll"].includes(rollMode))
    chatData["whisper"] = ChatMessage.getWhisperRecipients("GM");
  if (rollMode === "selfroll") chatData["whisper"] = [game.user._id];
  if (rollMode === "blindroll") chatData["blind"] = true;

  ChatMessage.create(chatData);
}

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createOseMacro(data, slot) {
    if ( data.type !== "Item" ) return;
    if (!( "data" in data ) ) return ui.notifications.warn("You can only create macro buttons for owned Items");
    const item = data.data;

    // Create the macro command
    const command = `game.ose.rollItemMacro("${item.name}");`;
    let macro = game.macros.contents.find(m => (m.name === item.name) && (m.command === command));
    if ( !macro ) {
      macro = await Macro.create({
        name: item.name,
        type: "script",
        img: item.img,
        command: command,
        flags: {"ose.itemMacro": true}
      });
    }
    game.user.assignHotbarMacro(macro, slot);
    return false;
  }

  /* -------------------------------------------- */

  /**
   * Create a Macro from an Item drop.
   * Get an existing item macro if one exists, otherwise create a new one.
   * @param {string} itemName
   * @return {Promise}
   */
  function rollItemMacro(itemName) {
    const speaker = ChatMessage.getSpeaker();
    let actor;
    if ( speaker.token ) actor = game.actors.tokens[speaker.token];
    if ( !actor ) actor = game.actors.get(speaker.actor);

    // Get matching items
    const items = actor ? actor.items.filter(i => i.name === itemName) : [];
    if ( items.length > 1 ) {
      ui.notifications.warn(`Your controlled Actor ${actor.name} has more than one Item with name ${itemName}. The first matched item will be chosen.`);
    } else if ( items.length === 0 ) {
      return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);
    }
    const item = items[0];

    // Trigger the item roll
      return item.roll();
  }

class OseParty {
  static get currentParty() {
    const characters = game.actors.filter(
      (act) =>
        act.data.type === "character" &&
        act.data.flags.ose &&
        act.data.flags.ose.party === true);

    return characters;
  }
}

class OsePartyXP extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["ose", "dialog", "party-xp"],
      template: `${OSE.systemPath()}/templates/apps/party-xp.html`,
      width: 300,
      height: "auto",
      resizable: false,
      closeOnSubmit: true,
    });
  }

  /* -------------------------------------------- */

  /**
   * Add the Entity name into the window title
   * @type {String}
   */
  get title() {
    return game.i18n.localize("OSE.dialog.xp.deal");
  }

  /* -------------------------------------------- */

  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @return {Object}
   */
  getData() {
    let data = {
      actors: OseParty.currentParty,
      data: this.object,
      config: CONFIG.OSE,
      user: game.user,
      settings: settings,
    };
    return data;
  }

  _onDrop(event) {
    event.preventDefault();
    // WIP Drop Item Quantity
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
      if (data.type !== "Item") return;
    } catch (err) {
      return false;
    }
  }
  /* -------------------------------------------- */

  _updateObject(event, formData) {
    this._dealXP(event);
  }

  _calculateShare(ev) {
    const currentParty = OseParty.currentParty;

    const html = $(this.form);
    const totalXP = html.find('input[name="total"]').val();
    const baseXpShare = parseFloat(totalXP) / currentParty.length;

    currentParty.forEach((a) => {
      const xpShare = Math.floor(
        (a.data.data.details.xp.share / 100) * baseXpShare
      );
      html.find(`li[data-actor-id='${a.id}'] input`).val(xpShare);
    });
  }

  _dealXP(ev) {
    const html = $(this.form);
    const rows = html.find(".actor");
    rows.each((_, row) => {
      const qRow = $(row);
      const value = qRow.find("input").val();
      const id = qRow.data("actorId");
      const actor = OseParty.currentParty.find((e) => e.id === id);
      if (value) {
        actor.getExperience(Math.floor(parseInt(value)));
      }
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    const totalField = html.find('input[name="total"]');
    totalField.on("input", this._calculateShare.bind(this));

    html.find('button[data-action="deal-xp"').click((event) => {
      super.submit(event);
    });
  }
}

const Party = {
  partySheet: void 0,
};

class OsePartySheet extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["ose", "dialog", "party-sheet"],
      template: `${OSE.systemPath()}/templates/apps/party-sheet.html`,
      width: 280,
      height: 400,
      resizable: true,
      dragDrop: [
        { dragSelector: ".actor-list .actor", dropSelector: ".party-members" },
      ],
      closeOnSubmit: false,
    });
  }

  static init() {
    Party.partySheet = new OsePartySheet();
  }

  static showPartySheet(options = {}) {
    OsePartySheet.partySheet.render(true, { focus: true, ...options });
  }

  static get partySheet() {
    return Party.partySheet;
  }

  /* -------------------------------------------- */

  /**
   * Add the Entity name into the window title
   * @type {String}
   */
  get title() {
    return game.i18n.localize("OSE.dialog.partysheet");
  }

  /* -------------------------------------------- */

  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @return {Object}
   */
  getData() {
    const settings = {
      ascending: game.settings.get("ose", "ascendingAC"),
    };

    let data = {
      partyActors: OseParty.currentParty,
      // data: this.object,
      config: CONFIG.OSE,
      user: game.user,
      settings: settings,
    };
    return data;
  }

  async _addActorToParty(actor) {
    if (actor.type !== "character") {
      return;
    }

    await actor.setFlag("ose", "party", true);
  }

  async _removeActorFromParty(actor) {
    await actor.setFlag("ose", "party", false);
  }

  /* ---------------------- */
  /* --Drag&Drop Behavior-- */
  /* ---------------------- */

  /* - Adding to the Party Sheet -*/
  _onDrop(event) {
    event.preventDefault();

    // WIP Drop Items
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));

      switch (data.type) {
        case "Actor":
          return this._onDropActor(event, data);
        case "Folder":
          return this._onDropFolder(event, data);
      }
    } catch (err) {
      return false;
    }
  }

  _onDropActor(event, data) {
    if (data.type !== "Actor") {
      return;
    }

    const actors = game.actors;
    let droppedActor = actors.find((actor) => actor.id === data.id);

    this._addActorToParty(droppedActor);
  }

  _recursiveAddFolder(folder) {
    folder.content.forEach((actor) => this._addActorToParty(actor));
    folder.children.forEach((folder) => this._recursiveAddFolder(folder));
  }

  _onDropFolder(event, data) {
    if (data.documentName !== "Actor") {
      return;
    }

    const folder = game.folders.get(data.id);
    if (!folder) return;

    this._recursiveAddFolder(folder);
  }

  /* - Dragging from the Party Sheet - */
  _onDragStart(event) {
    try {
      const actorId = event.currentTarget.dataset.actorId;

      const dragData = {
        id: actorId,
        type: "Actor",
      };

      // Set data transfer
      event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    } catch (error) {
      return false;
    }

    return true;
  }

  /* -------------------------------------------- */

  async _dealXP(ev) {
    new OsePartyXP(this.object, {}).render(true);
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".header #deal-xp").click(this._dealXP.bind(this));

    // Actor buttons
    const getActor = (event) => {
      const id = event.currentTarget.closest(".actor").dataset.actorId;
      return game.actors.get(id);
    };

    html.find(".field-img button[data-action='open-sheet']").click((event) => {
      getActor(event).sheet.render(true);
    });

    html
      .find(".field-img button[data-action='remove-actor']")
      .click(async (event) => {
        await this._removeActorFromParty(getActor(event));
      });
  }
}

const addControl = (object, html) => {
  let control = `<button class='ose-party-sheet' type="button" title='${game.i18n.localize(
    "OSE.dialog.partysheet"
  )}'><i class='fas fa-users'></i></button>`;
  html.find(".fas.fa-search").replaceWith($(control));
  html.find(".ose-party-sheet").click((ev) => {
    ev.preventDefault();
    Hooks.call("OSE.Party.showSheet");
  });
};

const update = (actor, data) => {
  const partyFlag = actor.getFlag("ose", "party");

  if (partyFlag === null) {
    return;
  }

  OsePartySheet.partySheet.render();
};

class OseCombat {
  static STATUS_SLOW = -789;
  static STATUS_DIZZY = -790;

  static debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }
  static async rollInitiative(combat, data) {
    // Check groups
    data.combatants = [];
    let groups = {};
    combat.data.combatants.forEach((cbt) => {
      const group = cbt.getFlag("ose", "group");
      groups[group] = { present: true };
      data.combatants.push(cbt);
    });
    // Roll init
    for (let group in groups) {
      // Object.keys(groups).forEach((group) => {
      let roll = new Roll("1d6").evaluate({ async: false });
      await roll.toMessage({
        flavor: game.i18n.format("OSE.roll.initiative", {
          group: CONFIG["OSE"].colors[group],
        }),
      });
      groups[group].initiative = roll.total;
      // });
    }
    // Set init
    for (let i = 0; i < data.combatants.length; ++i) {
      if (game.user.isGM) {
        if (!data.combatants[i].actor) {
          return;
        }
        if (data.combatants[i].actor.data.data.isSlow) {
          await data.combatants[i].update({
            initiative: OseCombat.STATUS_SLOW,
          });
        } else {
          const group = data.combatants[i].getFlag("ose", "group");
          this.debounce(
            data.combatants[i].update({ initiative: groups[group].initiative }),
            500
          );
        }
      }
    }

    await combat.setupTurns();
  }

  static async resetInitiative(combat, data) {
    let reroll = game.settings.get("ose", "rerollInitiative");
    if (!["reset", "reroll"].includes(reroll)) {
      return;
    }
    combat.resetAll();

  }

  static async individualInitiative(combat, data) {
    let updates = [];
    let rolls = [];
    for (let i = 0; i < combat.data.combatants.size; i++) {
      let c = combat.data.combatants.contents[i];
      // This comes from foundry.js, had to remove the update turns thing
      // Roll initiative
      const cf = await c._getInitiativeFormula(c);
      const roll = await c.getInitiativeRoll(cf);
      rolls.push(roll);
      const data = { _id: c.id };
      updates.push(data);
    }
    //combine init rolls
    const pool = PoolTerm.fromRolls(rolls);
    const combinedRoll = await Roll.fromTerms([pool]);
    //get evaluated chat message
    const evalRoll = await combinedRoll.toMessage({}, { create: false });
    let rollArr = combinedRoll.terms[0].rolls;
    let msgContent = ``;
    for (let i = 0; i < rollArr.length; i++) {
      let roll = rollArr[i];
      //get combatant
      let cbt = game.combats.viewed.combatants.find(
        (c) => c.id == updates[i]._id
      );
      //add initiative value to update
      //check if actor is slow
      let value = cbt.actor.data.data.isSlow
        ? OseCombat.STATUS_SLOW
        : roll.total;
      //check if actor is defeated
      if (combat.settings.skipDefeated && cbt.isDefeated) {
        value = OseCombat.STATUS_DIZZY;
      }
      updates[i].initiative = value;

      //render template
      let template = `${OSE.systemPath()}/templates/chat/roll-individual-initiative.html`;
      let tData = {
        name: cbt.name,
        formula: roll.formula,
        result: roll.result,
        total: roll.total,
      };
      let rendered = await renderTemplate(template, tData);
      msgContent += rendered;
    }
    evalRoll.content = `
    <details>
    <summary>${game.i18n.localize("OSE.roll.individualInitGroup")}</summary>
    ${msgContent}
    </details>`;
    ChatMessage.create(evalRoll);
    //update tracker
    if (game.user.isGM)
      await combat.updateEmbeddedDocuments("Combatant", updates);
    data.turn = 0;
  }

  static format(object, html, user) {
    html.find(".initiative").each((_, span) => {
      span.innerHTML =
        span.innerHTML == `${OseCombat.STATUS_SLOW}`
          ? '<i class="fas fa-weight-hanging"></i>'
          : span.innerHTML;
      span.innerHTML =
        span.innerHTML == `${OseCombat.STATUS_DIZZY}`
          ? '<i class="fas fa-dizzy"></i>'
          : span.innerHTML;
    });

    html.find(".combatant").each((_, ct) => {
      // Append spellcast and retreat
      const controls = $(ct).find(".combatant-controls .combatant-control");
      const cmbtant = object.viewed.combatants.get(ct.dataset.combatantId);
      const moveInCombat = cmbtant.getFlag("ose", "moveInCombat");
      const preparingSpell = cmbtant.getFlag("ose", "prepareSpell");
      const moveActive = moveInCombat ? "active" : "";
      controls
        .eq(1)
        .after(
          `<a class='combatant-control move-combat ${moveActive}' title="${game.i18n.localize(
            "OSE.CombatFlag.RetreatFromMeleeDeclared"
          )}"><i class='fas fa-walking'></i></a>`
        );
      const spellActive = preparingSpell ? "active" : "";
      controls
        .eq(1)
        .after(
          `<a class='combatant-control prepare-spell ${spellActive}' title="${game.i18n.localize(
            "OSE.CombatFlag.SpellDeclared"
          )}"><i class='fas fa-magic'></i></a>`
        );
    });
    OseCombat.announceListener(html);

    let init = game.settings.get("ose", "initiative") === "group";
    if (!init) {
      return;
    }

    html.find('.combat-control[data-control="rollNPC"]').remove();
    html.find('.combat-control[data-control="rollAll"]').remove();
    let trash = html.find(
      '.encounters .combat-control[data-control="endCombat"]'
    );
    $(
      '<a class="combat-control" data-control="reroll"><i class="fas fa-dice"></i></a>'
    ).insertBefore(trash);

    html.find(".combatant").each((_, ct) => {
      // Can't roll individual inits
      $(ct).find(".roll").remove();

      // Get group color
      const cmbtant = object.viewed.combatants.get(ct.dataset.combatantId);
      let color = cmbtant.getFlag("ose", "group");

      // Append colored flag
      let controls = $(ct).find(".combatant-controls");
      controls.prepend(
        `<a class='combatant-control flag' style='color:${color}' title="${CONFIG.OSE.colors[color]}"><i class='fas fa-flag'></i></a>`
      );
    });
    OseCombat.addListeners(html);
  }

  static updateCombatant(combatant, data) {
    let init = game.settings.get("ose", "initiative");
    // Why do you reroll ?
    if (combatant.actor.data.data.isSlow) {
      data.initiative = -789;
      return;
    }
    if (data.initiative && init == "group") {
      let groupInit = data.initiative;
      const cmbtGroup = combatant.getFlag("ose", "group");
      // Check if there are any members of the group with init
      game.combats.viewed.combatants.forEach((ct) => {
        const group = ct.getFlag("ose", "group");
        if (
          ct.initiative &&
          ct.initiative != "-789.00" &&
          ct.id != data.id &&
          group == cmbtGroup
        ) {
          // Set init
          if (game.user.isGM) {
            combatant.update({ initiative: parseInt(groupInit) });
          }
        }
      });
    }
  }

  static announceListener(html) {
    html.find(".combatant-control.prepare-spell").click((ev) => {
      ev.preventDefault();
      // Toggle spell announcement
      let id = $(ev.currentTarget).closest(".combatant")[0].dataset.combatantId;
      let isActive = ev.currentTarget.classList.contains("active");
      const combatant = game.combat.combatants.get(id);
      combatant.setFlag("ose", "prepareSpell", !isActive);
    });
    html.find(".combatant-control.move-combat").click((ev) => {
      ev.preventDefault();
      // Toggle spell announcement
      let id = $(ev.currentTarget).closest(".combatant")[0].dataset.combatantId;
      let isActive = ev.currentTarget.classList.contains("active");
      const combatant = game.combat.combatants.get(id);
      if (game.user.isGM) {
        combatant.setFlag("ose", "moveInCombat", !isActive);
      }
    });
  }

  static addListeners(html) {
    // Cycle through colors
    html.find(".combatant-control.flag").click((ev) => {
      if (!game.user.isGM) {
        return;
      }
      let currentColor = ev.currentTarget.style.color;
      let colors = Object.keys(CONFIG.OSE.colors);
      let index = colors.indexOf(currentColor);
      if (index + 1 == colors.length) {
        index = 0;
      } else {
        index++;
      }
      let id = $(ev.currentTarget).closest(".combatant")[0].dataset.combatantId;
      const combatant = game.combat.combatants.get(id);
      if (game.user.isGM) {
        combatant.setFlag("ose", "group", colors[index]);
      }
    });

    html.find('.combat-control[data-control="reroll"]').click((ev) => {
      if (!game.combat) {
        return;
      }
      let data = {};
      OseCombat.rollInitiative(game.combat, data);
      if (game.user.isGM) {
        game.combat.update({ data: data }).then(() => {
          game.combat.setupTurns();
        });
      }
    });
  }

  static addCombatant(combat, data, options, id) {
    let token = canvas.tokens.get(data.tokenId);
    let color = "black";
    switch (token.data.disposition) {
      case -1:
        color = "red";
        break;
      case 0:
        color = "yellow";
        break;
      case 1:
        color = "green";
        break;
    }
    data.flags = {
      ose: {
        group: color,
      },
    };
    combat.data.update({ flags: { ose: { group: color } } });
  }

  static activateCombatant(li) {
    const turn = game.combat.turns.findIndex(
      (turn) => turn.id === li.data("combatant-id")
    );
    if (game.user.isGM) {
      game.combat.update({ turn: turn });
    }
  }

  static addContextEntry(html, options) {
    options.unshift({
      name: "Set Active",
      icon: '<i class="fas fa-star-of-life"></i>',
      callback: OseCombat.activateCombatant,
    });
  }

  static async preUpdateCombat(combat, data, diff, id) {
    let init = game.settings.get("ose", "initiative");
    let reroll = game.settings.get("ose", "rerollInitiative");
    if (!data.round) {
      return;
    }
    if (data.round !== 1) {
      if (reroll === "reset") {
        OseCombat.resetInitiative(combat, data, diff, id);
        return;
      } else if (reroll === "keep") {
        return;
      }
    }
    if (init === "group") {
      OseCombat.rollInitiative(combat, data, diff, id);
    } else if (init === "individual") {
      OseCombat.individualInitiative(combat, data, diff, id);
    }
  }
}

const RenderCompendium = async function (object, html, d) {
  if (object.documentName != "Item") {
    return;
  }
  const render = html[0].querySelectorAll(".item");
  const docs = await d.collection.getDocuments();

  render.forEach(async function (item, i) {
    const id = render[i].dataset.documentId;

    const element = docs.filter((d) => d.id === id)[0];
    const tagTemplate = $.parseHTML(
      await renderTemplate(
        `${OSE.systemPath()}/templates/actors/partials/item-auto-tags-partial.html`,
        { tags: OseItem.prototype.getAutoTagList.call(element) }
      )
    );

    $(item).append(tagTemplate);
  });
};

const RenderDirectory = async function (object, html) {
  if (object.id != "items") {
    return;
  }

  const render = html[0].querySelectorAll(".item");
  const content = object.documents;

  render.forEach(async function (item) {
    const foundryDocument = content.find(
      (e) => e.id == item.dataset.documentId
    );

    const tagTemplate = $.parseHTML(
      await renderTemplate(
        `${OSE.systemPath()}/templates/actors/partials/item-auto-tags-partial.html`,
        { tags: OseItem.prototype.getAutoTagList.call(foundryDocument) }
      )
    );
    $(item).append(tagTemplate);
  });
};

// Import Modules

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d6 + @initiative.value",
    decimals: 2,
  };

  CONFIG.OSE = OSE;

  game.ose = {
    rollItemMacro: rollItemMacro,
    oseCombat: OseCombat,
  };

  // Init Party Sheet handler
  OsePartySheet.init();

  // Custom Handlebars helpers
  registerHelpers();

  // Register custom system settings
  registerSettings();

  // Register APIs of Foundry VTT Modules we explicitly support that provide custom hooks
  registerFVTTModuleAPIs();

  CONFIG.Actor.documentClass = OseActor;
  CONFIG.Item.documentClass = OseItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ose", OseActorSheetCharacter, {
    types: ["character"],
    makeDefault: true,
    label: "OSE.SheetClassCharacter",
  });
  Actors.registerSheet("ose", OseActorSheetMonster, {
    types: ["monster"],
    makeDefault: true,
    label: "OSE.SheetClassMonster",
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("ose", OseItemSheet, {
    makeDefault: true,
    label: "OSE.SheetClassItem",
  });

  await preloadHandlebarsTemplates();
});

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
 */
Hooks.once("setup", function () {
  // Localize CONFIG objects once up-front
  const toLocalize = [
    "saves_short",
    "saves_long",
    "scores",
    "armor",
    "colors",
    "tags",
  ];
  for (let o of toLocalize) {
    CONFIG.OSE[o] = Object.entries(CONFIG.OSE[o]).reduce((obj, e) => {
      obj[e[0]] = game.i18n.localize(e[1]);
      return obj;
    }, {});
  }

  // Custom languages
  const languages = game.settings.get("ose", "languages");
  if (languages != "") {
    const langArray = languages.split(",");
    langArray.forEach((l, i) => (langArray[i] = l.trim()));
    CONFIG.OSE.languages = langArray;
  }
});

Hooks.once("ready", async () => {
  Hooks.on("hotbarDrop", (bar, data, slot) =>
    createOseMacro(data, slot)
  );
});

// License info
Hooks.on("renderSidebarTab", async (object, html) => {
  if (object instanceof ActorDirectory) {
    addControl(object, html);
  }
  if (object instanceof Settings) {
    let gamesystem = html.find("#game-details");
    // SRD Link
    let ose = gamesystem.find("h4").last();
    ose.append(
      ` <sub><a href="https://oldschoolessentials.necroticgnome.com/srd/index.php">SRD<a></sub>`
    );

    // License text
    const template = `${OSE.systemPath()}/templates/chat/license.html`;
    const rendered = await renderTemplate(template);
    gamesystem.find(".system").append(rendered);

    // User guide
    let docs = html.find("button[data-action='docs']");
    const styling =
      "border:none;margin-right:2px;vertical-align:middle;margin-bottom:5px";
    $(
      `<button data-action="userguide"><img src='systems/ose/assets/dragon.png' width='16' height='16' style='${styling}'/>Old School Guide</button>`
    ).insertAfter(docs);
    html.find('button[data-action="userguide"]').click((ev) => {
      new FrameViewer("https://vttred.github.io/ose", {
        resizable: true,
      }).render(true);
    });
  }
});

Hooks.on("preCreateCombatant", (combat, data, options, id) => {
  let init = game.settings.get("ose", "initiative");
  if (init == "group") {
    OseCombat.addCombatant(combat, data, options, id);
  }
});

Hooks.on("updateCombatant", OseCombat.debounce(OseCombat.updateCombatant), 100);
Hooks.on("renderCombatTracker", OseCombat.debounce(OseCombat.format, 100));
Hooks.on("preUpdateCombat", OseCombat.preUpdateCombat);
Hooks.on(
  "getCombatTrackerEntryContext",
  OseCombat.debounce(OseCombat.addContextEntry, 100)
);

Hooks.on("renderChatLog", (app, html, data) => OseItem.chatListeners(html));
Hooks.on("getChatLogEntryContext", addChatMessageContextOptions);
Hooks.on("renderChatMessage", addChatMessageButtons);
Hooks.on("renderRollTableConfig", augmentTable);
Hooks.on("updateActor", update);

Hooks.on("renderCompendium", RenderCompendium);
Hooks.on("renderSidebarDirectory", RenderDirectory);

Hooks.on("OSE.Party.showSheet", OsePartySheet.showPartySheet);
//# sourceMappingURL=ose.js.map
