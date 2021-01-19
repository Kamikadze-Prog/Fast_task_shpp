"use strict";

function DataTable(apiUrl, root) {
    makeUserLinkSite(apiUrl, root).then();
}

async function makeUserLinkSite(apiUrl, root) {
    const data = await makeJson(apiUrl)
    makingsUserBlock(data.setup, root);
    makingsLinkBlock(data.links, root);
}

function makeJson(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const urlData = ['links', 'setup'];
            urlData['links'] = data.links;
            urlData['setup'] = data.setup;
            return urlData;
        });
}

function makingsUserBlock(setup, root) {

    root.style = `${setup.pageBackgroundStyle}`;
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('user_wrapper');

    const userName = document.createElement('span');
    userName.id = ('user_name');
    userName.textContent  = setup.username;

    const userAvatar = document.createElement('img');
    userAvatar.id = ('user_avatar');
    userAvatar.setAttribute('src', setup.avatar);
    userAvatar.style = "width: 100px;height: 100px";

    linkWrapper.append(userAvatar);
    linkWrapper.append(userName);
    root.append(linkWrapper);
}

function makingsLinkBlock(links, root) {
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('links_wrapper');
    links.forEach(element => {
        makeLinkBlock(element,linkWrapper );
    });
    root.append(linkWrapper);
}

function  makeLinkBlock(element,linkWrapper ){
    const linksInnerWrapper = document.createElement('div');
    const tagA = document.createElement('a');
    linksInnerWrapper.classList.add('links_inner_wrapper');
    tagA.textContent = element.text;
    tagA.setAttribute('href', element.link);
    tagA.style = element.customStyle;
    linksInnerWrapper.append(tagA);
    linkWrapper.append(linksInnerWrapper);
}

const url = 'https://lambda.shpp.me/multilink?page=kowo';
const root = document.querySelector('#root');
DataTable(url, root);