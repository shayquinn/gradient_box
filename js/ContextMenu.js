class ContextMenu {
    constructor() {
        this.menu = document.createElement('div');
        this.menu.className = 'context-menu';
        document.body.appendChild(this.menu);

        document.addEventListener('click', () => this.hide());
        document.addEventListener('contextmenu', (e) => {
            if (!this.menu.contains(e.target)) {
                this.hide();
            }
        });
    }

    show(x, y, items) {
        this.menu.innerHTML = '';
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'context-menu-item';
            menuItem.textContent = item.label;
            menuItem.addEventListener('click', item.action);
            this.menu.appendChild(menuItem);
        });

        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;
        this.menu.style.display = 'block';
    }

    hide() {
        this.menu.style.display = 'none';
    }
}

export default ContextMenu;