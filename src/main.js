const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.addButton');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
];

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除 / 开头的内容
};
const render = () => {
    $siteList.find('li:not(.addButton)').remove();
    hashMap.forEach(node => {
        const $li = $(`
            <li>
                <a href="${node.url}">
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class="close">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>`).insertBefore($lastLi)
    })
};

render();

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？');
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url);
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        });
        render()
    });

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string)
};