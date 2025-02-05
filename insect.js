class Insect {
  constructor() {
    this.injectStyles();
    this.injectHTML();
    this.panel = document.getElementById('insect-panel');
    this.storageList = this.panel.querySelector('.storage-list');
    this.init();
  }

  injectStyles() {
    const styles = `
      #insect-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 400px;
        max-height: calc(100vh - 40px);
        display: flex;
        flex-direction: column;
        background: #2a2a2a;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        color: #fff;
        font-family: system-ui, -apple-system, sans-serif;
        z-index: 10000;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
      }

      #insect-panel.hidden {
        transform: translateX(420px);
        opacity: 0;
        pointer-events: none;
      }

      .insect-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #363636;
        border-radius: 8px 8px 0 0;
        flex-shrink: 0;
      }

      .insect-header h2 {
        margin: 0;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .close-btn {
        cursor: pointer;
        font-size: 24px;
        opacity: 0.7;
      }

      .close-btn:hover {
        opacity: 1;
      }

      .insect-content {
        padding: 16px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .storage-list {
        flex: 1;
        overflow-y: auto;
        min-height: 0;
        margin-bottom: 16px;
      }

      .storage-item {
        background: #363636;
        border-radius: 4px;
        padding: 12px;
        margin-bottom: 8px;
        border: 1px solid transparent;
        transition: border-color 0.2s;
      }

      .storage-item.expanded {
        border-color: #64d9ff;
      }

      .storage-item-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        cursor: pointer;
        user-select: none;
      }

      .storage-key {
        font-weight: bold;
        color: #64d9ff;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        word-break: break-all;
        line-height: 1.4;
      }

      .storage-key::before {
        content: "▶";
        font-size: 10px;
        transition: transform 0.2s;
        flex-shrink: 0;
        margin-top: 4px;
      }

      .storage-item.expanded .storage-key::before {
        transform: rotate(90deg);
      }

      .storage-actions {
        display: flex;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s;
        flex-shrink: 0;
      }

      .storage-item:hover .storage-actions {
        opacity: 1;
      }

      .storage-actions button {
        background: none;
        border: none;
        color: #fff;
        opacity: 0.7;
        cursor: pointer;
        padding: 4px;
      }

      .storage-actions button:hover {
        opacity: 1;
      }

      .storage-value-container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
      }

      .storage-item.expanded .storage-value-container {
        max-height: 500px;
        overflow-y: auto;
      }

      .storage-value {
        color: #a9a9a9;
        word-break: break-all;
        margin-top: 8px;
        font-family: monospace;
        white-space: pre-wrap;
      }

      .storage-value.editing {
        display: none;
      }

      .value-editor {
        display: none;
        width: 100%;
        background: #1a1a1a;
        border: 1px solid #464646;
        color: #fff;
        padding: 8px;
        border-radius: 4px;
        font-family: monospace;
        min-height: 100px;
        resize: vertical;
        margin-top: 8px;
        max-height: 400px;
        overflow-y: auto;
      }

      .value-editor.editing {
        display: block;
      }

      .controls {
        display: flex;
        gap: 8px;
        justify-content: space-between;
        flex-shrink: 0;
      }

      .controls-group {
        display: flex;
        gap: 8px;
      }

      #insect-panel button {
        background: #4a4a4a;
        border: none;
        color: #fff;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      #insect-panel button:hover {
        background: #5a5a5a;
      }

      #insect-panel button.primary {
        background: #2196f3;
      }

      #insect-panel button.primary:hover {
        background: #1976d2;
      }

      #insect-panel button.danger {
        background: #f44336;
      }

      #insect-panel button.danger:hover {
        background: #d32f2f;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  injectHTML() {
    const html = `
      <div id="insect-panel" class="hidden">
        <div class="insect-header">
          <h2>🪲 Insect</h2>
          <span class="close-btn">&times;</span>
        </div>
        <div class="insect-content">
          <div class="storage-list">
            <!-- Storage items will be listed here -->
          </div>
          <div class="controls">
            <div class="controls-group">
              <button id="add-item" class="primary">➕ Add New Item</button>
              <button id="export-all">📤 Export</button>
              <button id="import-data">📥 Import</button>
            </div>
            <div class="controls-group">
              <button id="clear-all" class="danger">🗑️ Clear All</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);
  }

  init() {
    // Initialize keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if (e.key === '`') {
        this.togglePanel();
      }
    });

    // Initialize close button
    this.panel.querySelector('.close-btn').addEventListener('click', () => {
      this.hidePanel();
    });

    // Initialize control buttons
    document.getElementById('add-item').addEventListener('click', () => {
      this.addNewItem();
    });

    document.getElementById('clear-all').addEventListener('click', () => {
      this.clearAll();
    });

    document.getElementById('export-all').addEventListener('click', () => {
      this.exportAll();
    });

    document.getElementById('import-data').addEventListener('click', () => {
      this.importData();
    });

    // Initial render
    this.renderStorageItems();
  }

  togglePanel() {
    this.panel.classList.toggle('hidden');
    if (!this.panel.classList.contains('hidden')) {
      this.renderStorageItems();
    }
  }

  hidePanel() {
    this.panel.classList.add('hidden');
  }

  renderStorageItems() {
    this.storageList.innerHTML = '';
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      this.createStorageItemElement(key, value);
    }
  }

  createStorageItemElement(key, value) {
    const item = document.createElement('div');
    item.className = 'storage-item';
    item.innerHTML = `
      <div class="storage-item-header">
        <span class="storage-key">${this.escapeHtml(key)}</span>
        <div class="storage-actions">
          <button class="edit-btn" title="Edit">✏️</button>
          <button class="delete-btn" title="Delete">🗑️</button>
        </div>
      </div>
      <div class="storage-value-container">
        <div class="storage-value">${this.formatValue(value)}</div>
        <textarea class="value-editor">${this.escapeHtml(value)}</textarea>
      </div>
    `;

    // Add event listeners
    const header = item.querySelector('.storage-item-header');
    header.addEventListener('click', (e) => {
      if (!e.target.closest('.storage-actions')) {
        this.toggleItemExpansion(item);
      }
    });

    item.querySelector('.edit-btn').addEventListener('click', () => {
      this.toggleEditMode(item);
    });

    item.querySelector('.delete-btn').addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete "${key}"?`)) {
        localStorage.removeItem(key);
        item.remove();
      }
    });

    const editor = item.querySelector('.value-editor');
    editor.addEventListener('blur', (e) => {
      this.saveEdit(key, e.target.value);
      this.toggleEditMode(item);
    });

    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.target.blur();
      }
      if (e.key === 'Escape') {
        this.toggleEditMode(item);
      }
    });

    this.storageList.appendChild(item);
  }

  toggleItemExpansion(item) {
    // Collapse other items
    this.storageList.querySelectorAll('.storage-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('expanded');
      }
    });
    
    item.classList.toggle('expanded');
  }

  toggleEditMode(item) {
    const valueDisplay = item.querySelector('.storage-value');
    const editor = item.querySelector('.value-editor');
    
    valueDisplay.classList.toggle('editing');
    editor.classList.toggle('editing');
    
    if (editor.classList.contains('editing')) {
      editor.focus();
    }
  }

  saveEdit(key, newValue) {
    localStorage.setItem(key, newValue);
    this.renderStorageItems();
  }

  addNewItem() {
    const key = prompt('Enter key name:');
    if (key) {
      const value = prompt('Enter value:');
      if (value !== null) {
        localStorage.setItem(key, value);
        this.renderStorageItems();
      }
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all items? This cannot be undone.')) {
      localStorage.clear();
      this.renderStorageItems();
    }
  }

  exportAll() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorage-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (confirm('This will override any existing items with the same keys. Continue?')) {
            Object.entries(data).forEach(([key, value]) => {
              localStorage.setItem(key, value);
            });
            this.renderStorageItems();
          }
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  }

  formatValue(value) {
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return this.escapeHtml(value);
    }
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize the plugin
const insect = new Insect();
