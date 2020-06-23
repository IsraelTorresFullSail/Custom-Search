//================== Custom Search ==================//
let postList = [];
let postListUpdated = [];
let post = document.querySelectorAll('.post-wrapper');

for (let i = 0; i < post.length; i++) {
  let content = post[i].innerText;
  let link = post[i].children[3].href;
  let title = post[i].firstChild.innerText;
  postList.push({content, link, title});
}

let existingPostList = JSON.parse(localStorage.getItem('postList', JSON.stringify(postList)));

if(existingPostList !== null) {
    postListUpdated = Object.values(existingPostList);
    for (let i = 0; i < postList.length; i++) {
    	if (!postListUpdated.find(o => o.content === postList[i].content && o.link === postList[i].link && o.title === postList[i].title)){
     		postListUpdated.push(postList[i])
     	}
    }
    localStorage.setItem('postList', JSON.stringify(postListUpdated));
} else {
    localStorage.setItem('postList', JSON.stringify(postList));
}

function searchAList(search) {
    return function (searchMe){
        return searchMe.content.toLowerCase().includes(search.toLowerCase()) || !search
    }  
};

let search = [];
document.getElementById('search').addEventListener('input', function(e) {
    search = e.target.value;
    localStorage.setItem('search', JSON.stringify(search));
});
  
let returnList;
window.addEventListener('load', (event) => {
    returnList = JSON.parse(localStorage.getItem('postList'))
});
  

document.getElementById('search').addEventListener('input', function() {
    const getSearch = JSON.parse(localStorage.getItem('search'));
    let myList = returnList.filter(searchAList(getSearch)).map(item => {
        return `<div class="item">
                    <a class="orange-link" href="${item.link}">${item.title}</a>
                </div>`;
            
    });

    document.querySelector('.result-container').innerHTML = myList.join(' ');

    if(document.getElementById('search').value == '') {
        document.querySelector('.result-container').style.display = 'none';
    } else {
        document.querySelector('.result-container').style.display = 'flex';
    }
});