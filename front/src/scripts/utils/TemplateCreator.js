var divElement = document.createElement('div');

function getTemplateRootNode(scriptId) {
    let script = document.getElementById(scriptId);
    divElement.innerHTML = script.innerHTML;

    let result = divElement.children[0];
    divElement.removeChild(result);

    return result;
}

var TemplateCreator = {
    todoItem: data => {
        let root = getTemplateRootNode('template');
        let doneMark = root.querySelector('.todos-item_done-mark');
        let remove = root.querySelector('.todos-item_delete');
        let text = root.querySelector('.todos-item_text');

        if (data.text) {
            text.innerText = data.text;
        }

        if (data.isReady) {
            doneMark.checked = true;
        }

        return {
            root: root,
            text: text,
            doneMark: doneMark,
            remove: remove
        };
    }
};

module.exports = TemplateCreator;
