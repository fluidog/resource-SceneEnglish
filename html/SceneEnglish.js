let default_style = {
    /* 0: 不显示翻译，1: 显示 */
    "translate": 1,
    /* 核心含义 */
    "coreMeaning": 1,
    /* 词根词缀 */
    "rootAffix": 1,
    /* 派生含义 */
    "derivedMeaning": 1,
}

function saveVariable(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function getVariable(name) {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : default_style;
}

function refreshStyle() {
    const style = getVariable('style');
    Object.entries(style).forEach(([className, display]) => {
        if (display == 1) {
            document.querySelectorAll(`.${className}`).forEach(element => {
                if (className === 'translate') {
                    element.style.display = 'inline';
                }
                else {
                    element.style.display = 'block';
                }
            });
        }
        else {
            document.querySelectorAll(`.${className}`).forEach(element => {
                element.style.display = 'none';
            });
        }
    });
    console.log("refreshStyle", getVariable('style'));
}

document.addEventListener('DOMContentLoaded', function() {
    // addBaseUrlToSrc(baseUrl);
    refreshStyle();
    document.querySelectorAll('.header').forEach(el => {
        el.addEventListener('click', function(event) {
            console.log("hello ",event.target);
            if (event.target === el) {
                hide(this.parentElement);
            }
        });
    });

    /* 恢复默认 */
    document.querySelectorAll('.word').forEach(el => {
        el.addEventListener('click', function(event) {
            if (event.target === el) {
                saveVariable('style', default_style);
                refreshStyle();
            }
        });
    }); 
});

function hide(element) {
    const name = element.classList[0];
    saveVariable('style', {
        ...getVariable('style'),
        [name]: 0,
    });
    refreshStyle()
}

baseUrl = 'https://jsd.onmicrosoft.cn/gh/fluidog/resource-SceneEnglish/html/';

function changeBaseUrl(newBaseUrl) {
    let base = document.createElement('base');
    base.href = newBaseUrl;
    document.head.appendChild(base);
}
changeBaseUrl(baseUrl);

function addBaseUrlToSrc(baseUrl) {
    // 选择所有带有 src 属性的元素
    const elements = document.querySelectorAll('[src]');

    elements.forEach(element => {
        console.log("hello", element.classList);
        let src = element.getAttribute('src');

        // 检查 src 是否已经是绝对 URL
        if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('//')) {
            // 移除开头的斜杠（如果有）
            src = src.replace(/^\//, '');

            // 组合基础 URL 和 src
            element.setAttribute('src', baseUrl + src);
        }
    });
}