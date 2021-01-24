"use strict";
function makeSite(apiUrl, root) {
    makeUserSite(apiUrl, root).then();
}

async function makeUserSite(apiUrl, root) {
    const data = await makeJson(apiUrl)
    makeUserBlock(data.setup, root);
    makeLinkBlock(data.links, root);
}
/*Get data from api*/
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

function makeUserBlock(setup, root) {
    const {pageBackgroundStyle, avatar, username} = setup;
    root.style = pageBackgroundStyle;
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('user_wrapper');

    const userName = document.createElement('span');
    userName.textContent = username;

    const userAvatar = document.createElement('img');
    userAvatar.id = ('user_avatar');
    userAvatar.setAttribute('src', avatar);

    linkWrapper.append(userAvatar);
    linkWrapper.append(userName);
    root.append(linkWrapper);
}

function makeLinkBlock(links, root) {
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('links_wrapper');
    links.forEach(element => {
        makeLink(element, linkWrapper);
    });
    root.append(linkWrapper);
}

function makeLink(element, linkWrapper) {
    const {customStyle, defaultButtonsStyle , link, text} = element;
    const linksInnerWrapper = document.createElement('div');
    const tagA = document.createElement('a');
    linksInnerWrapper.classList.add('links_inner_wrapper');
    tagA.textContent = text.charAt(0).toUpperCase() + text.slice(1); // change 1 letter to uppercase
    tagA.setAttribute('href', link);
    tagA.setAttribute('target', 'blank');
    tagA.style = customStyle ? customStyle : defaultButtonsStyle;
    linksInnerWrapper.style = defaultButtonsStyle;
    linksInnerWrapper.append(tagA);
    linkWrapper.append(linksInnerWrapper);
}

const url = 'https://lambda.shpp.me/multilink?page=kowo';
const root = document.querySelector('#root');
makeSite(url, root);