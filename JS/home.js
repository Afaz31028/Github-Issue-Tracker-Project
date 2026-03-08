const openContainer = document.getElementById('open-container');
const closeContainer = document.getElementById('closed-container');
const allContainer = document.getElementById('issues-container');
const btnAll = document.querySelector('.btn-all');
const btnOpen = document.querySelector('.btn-open');
const btnClose = document.querySelector('.btn-close');
const totalIssue = document.getElementById('total-issues');
const btns = [btnAll, btnOpen, btnClose];

let curState='all';

const loadAllIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(issues => {
            displayAllIssues(issues.data);
        })
}
loadAllIssues();
const displayAllIssues = (issues) => {
    allContainer.innerHTML = "";
    issues.forEach((issue) => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div id="card-${issue.id}" class="card md:p-4 p-2 md:max-w-[256.5px] max-w-full shadow-2xl border-t-4 ${issue.status === 'open' ? `border-green-500` : `border-violet-500`} mx-auto rounded-lg">
                <div class="flex justify-between">
                    ${issue.status === 'open'
                ? `<img src="assets/Open-Status.png" alt="">`
                : `<img src="assets/Closed-Status.png" alt="">`
            }   
                
                    ${issue.priority === 'high'
                ? `<h5 class="bg-[#FEECEC] px-5 py-1 text-red-500 font-bold rounded-2xl">High</h5>`
                : issue.priority === 'medium'
                    ? `<h5 class="bg-amber-100 px-5 py-1 text-amber-500 font-bold rounded-2xl">Medium</h5>`
                    : `<h5 class="bg-gray-300 px-5 py-1 text-gray-700 font-bold rounded-2xl">Low</h5>`
            }
                </div>
                <h4 class="text-sm font-semibold mt-3">${issue.title}</h4>
                <p class="mt-3 text-[#64748B] text-sm">${issue.description}</p>
                <div class="labels-container flex flex-wrap gap-3 items-center mt-3">
                    ${displayLabels(issue.labels)}
                </div>
                <hr class="mt-4 opacity-20">
                <p class="mt-3 text-[#64748B] text-sm">#${issue.id} <span>${issue.author}</span></p>
                <p class="mt-3 text-[#64748B] text-sm">${issue.createdAt.slice(0, 10)}</p>
            </div>
        `
        allContainer.appendChild(issueCard);
        document.getElementById(`card-${issue.id}`).addEventListener('click', () => {
            loadIssueModal(issue.id);
        })
    });
    const total = allContainer.querySelectorAll('.card');
    totalIssue.innerText = `${total.length} Issues`;
    loadOpenCloseIssues();
}
const displayLabels = (issueLabels) => {
    let labelsHTML = "";
    for (const label of issueLabels) {
        if (label.toLowerCase() === "bug") {
            labelsHTML += `
            <div class="px-3 py-1 bg-red-100 rounded-xl">
                <h3 class="text-red-600 text-sm font-normal">BUG</h3>
            </div>`
        }
        else if (label.toLowerCase() === "help wanted") {
            labelsHTML += `
            <div class="px-3 py-1 bg-amber-100 rounded-xl">
                <h3 class="text-amber-600 text-sm font-normal">HELP WANTED</h3>
            </div>`
        }
        else if (label.toLowerCase() === 'enhancement') {
            labelsHTML += `
            <div class="px-3 py-1 bg-green-200 rounded-xl">
                <h3 class="text-green-600 text-sm font-normal">ENHANCEMENT</h3>
            </div>`
        }
        else if (label.toLowerCase() === 'good first issue') {
            labelsHTML += `
            <div class="px-3 py-1 bg-lime-200 rounded-xl">
                <h3 class="text-lime-600 text-sm font-normal">GOOD FIRST ISSUE</h3>
            </div>`
        }
        else {
            labelsHTML += `
            <div class="px-3 py-1 bg-slate-300 rounded-xl">
                <h3 class="text-slate-700 text-sm font-normal">DOCUMENTATION</h3>
            </div>`
        }
    };
    return labelsHTML;
}
const loadIssueModal = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(card => displayIssueModal(card.data))
}
const displayIssueModal = (card) => {
    const modalBox = document.getElementById('modal-content');
    const modal = document.getElementById('my_modal');
    modalBox.innerHTML = "";
    modalBox.innerHTML = `
        <h1 class="text-xl font-semibold">${card.title}</h1>
        <div class="mt-3 flex flex-col md:flex-row gap-3 justify-start md:items-center">
            ${card.status === 'open'
            ? `<p class="bg-green-300 px-1 w-17 rounded-lg text-center">Opened</p>`
            : `<p class="bg-violet-300 px-1 w-17 rounded-lg text-center">Closed</p>`
        }
            <p>opened by ${card.author}</p>
            <p>${card.createdAt.slice(0, 10)}</p>
        </div>
        <div class="flex gap-3 mt-5">
            ${displayLabels(card.labels)}
        </div>
        <p class="mt-4 text-[#64748B] text-md">${card.description}</p>
        <div class="flex gap-35 mt-3 items-center">
            <div>
                <h5 class="text-[#64748B] text-md">Assignee:</h5>
                <h5 class="text-lg font-semibold">${card.author}</h5>
            </div>
            <div>
                <h5 class="mt-3 text-[#64748B] text-md">Priority:</h5>
                <h5>
                    ${card.priority === 'high'
            ? `<h5 class="bg-[#FEECEC] px-5 py-1 text-red-500 font-bold rounded-2xl">High</h5>`
            : card.priority === 'medium'
                ? `<h5 class="bg-amber-100 px-5 py-1 text-amber-500 font-bold rounded-2xl">Medium</h5>`
                : `<h5 class="bg-gray-300 px-5 py-1 text-gray-700 font-bold rounded-2xl">Low</h5>`
        }
                </h5>
            </div>
        </div>
    `
    modal.showModal();
}
const loadOpenCloseIssues = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains('border-green-500')) {
            const clone = card.cloneNode(true);
            openContainer.appendChild(clone);
        }
        else if (card.classList.contains('border-violet-500')) {
            const clone2 = card.cloneNode(true);
            closeContainer.appendChild(clone2);
        }
    })
}
const displayOpenIssues = () => {
    allContainer.classList.add('hidden');
    closeContainer.classList.add('hidden');
    openContainer.classList.remove('hidden');
    openContainer.classList.add('grid');
    inactive();
    btnOpen.classList.remove('text-[#64748B]');
    btnOpen.classList.add('bg-primary', 'text-white');
    curState='open';

    const totalOpen = openContainer.querySelectorAll('.card');
    totalIssue.innerText = `${totalOpen.length} Issues`;
}
const displayCloseIssues = () => {
    allContainer.classList.add('hidden');
    openContainer.classList.add('hidden');
    closeContainer.classList.remove('hidden');
    closeContainer.classList.add('grid');
    inactive();
    btnClose.classList.remove('text-[#64748B]');
    btnClose.classList.add('bg-primary', 'text-white');

    curState='closed';
    const totalClose = closeContainer.querySelectorAll('.card');
    totalIssue.innerText = `${totalClose.length} Issues`
}
const displayIssues = () => {
    openContainer.classList.add('hidden');
    closeContainer.classList.add('hidden');
    allContainer.classList.remove('hidden');
    allContainer.classList.add('grid');
    inactive();
    btnAll.classList.remove('text-[#64748B]');
    btnAll.classList.add('bg-primary', 'text-white');

    const total = allContainer.querySelectorAll('.card');
    totalIssue.innerText = `${total.length} Issues`
}
document.getElementById('open-container').addEventListener('click', (e) => {
    const box = e.target.closest('.card');
    const targetCard = box.querySelectorAll('p')[1].innerText;
    loadIssueModal(targetCard[1]);
})
document.getElementById('closed-container').addEventListener('click', (e) => {
    const box = e.target.closest('.card');
    const targetCard = box.querySelectorAll('p')[1].innerText;
    loadIssueModal(targetCard[1]);
})
const inactive = () => {
    btns.forEach(btn => {
        btn.classList.remove('text-white', 'bg-primary');
        btn.classList.add('text-[#64748B]')
    })
}

const searchSection = () => {
    const searchText = document.getElementById('search-box');
    const searchValue = searchText.value.trim().toLowerCase();

    if(searchValue===""){
        loadAllIssues();
        return;
    }
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(text => {
        const allWords = text.data;
        const filteredWords = allWords.filter(item => 
            item.title.toLowerCase().includes(searchValue)
        );
        displayAllIssues(filteredWords);
    })
}