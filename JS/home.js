const openContainer=document.getElementById('open-container');
const closeContainer=document.getElementById('closed-container');
const allContainer=document.getElementById('issues-container');

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
    // console.log(issues)
    issues.forEach((issue)=>{
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div id="card-${issue.id}" class="card md:p-4 p-2 md:max-w-[256.5px] max-w-full shadow-2xl border-t-4 ${issue.status==='open' ? `border-green-500` : `border-violet-500`} mx-auto rounded-lg">
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
                    <div class="flex gap-3 items-center mt-3">
                        ${displayLabels(issue.labels)}
                    </div>
                    <hr class="mt-4 opacity-20">
                    <p class="mt-3 text-[#64748B] text-sm">#${issue.id} <span>${issue.author}</span></p>
                    <p class="mt-3 text-[#64748B] text-sm">${issue.createdAt.slice(0,10)}</p>
                </div>
        `
        allContainer.appendChild(issueCard);
        document.getElementById(`card-${issue.id}`).addEventListener('click',()=>{
            displayIssueModal(issue);
        })
    });
    const total=allContainer.querySelectorAll('.card');
    const totalIssue=document.getElementById('total-issues');
    totalIssue.innerText=`${total.length} Issues`;
    loadOpenCloseIssues();
} 

const displayLabels=(issueLabels)=>{
   let labelsHTML = "";
    for (const label of issueLabels) {
        if (label === "bug") {
            labelsHTML += `
            <div class="px-3 py-1 bg-red-100 rounded-xl">
                <h3 class="text-red-600 text-sm font-normal">BUG</h3>
            </div>`
        } 
        else if (label === "help wanted") {
            labelsHTML += `
            <div class="px-3 py-1 bg-amber-100 rounded-xl">
                <h3 class="text-amber-600 text-sm font-normal">HELP WANTED</h3>
            </div>`
        }
        else if(label==='enhancement'){
            labelsHTML+=`
            <div class="px-3 py-1 bg-green-200 rounded-xl">
                <h3 class="text-green-600 text-sm font-normal">ENHANCEMENT</h3>
            </div>`
        }
        else if(label==='good first issue'){
            labelsHTML+=`
            <div class="px-3 py-1 bg-lime-200 rounded-xl">
                <h3 class="text-lime-600 text-sm font-normal">GOOD FIRST..</h3>
            </div>`
        }
        else{
            labelsHTML+=`
            <div class="px-3 py-1 bg-slate-300 rounded-xl">
                <h3 class="text-slate-700 text-sm font-normal">Documentation</h3>
            </div>`
        }
    };
    return labelsHTML;
}

const displayIssueModal=(card)=>{
    const modalBox=document.getElementById('modal-content');
    const modal=document.getElementById('my_modal');
    modalBox.innerHTML="";
    modalBox.innerHTML=`
        <h1 class="text-xl font-semibold">${card.title}</h1>
        <div class="mt-3 flex flex-col md:flex-row gap-3 justify-start md:items-center">
            ${card.status==='open' 
                ? `<p class="bg-green-300 px-1 w-17 rounded-lg text-center">Opened</p>` 
                : `<p class="bg-violet-300 px-1 w-17 rounded-lg text-center">Closed</p>`
            }
            <p>opended by ${card.author}</p>
            <p>${card.createdAt.slice(0,10)}</p>
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

const loadOpenCloseIssues=()=>{
    const cards=document.querySelectorAll('.card');
    cards.forEach(card=>{
        if(card.classList.contains('border-green-500')){
             const clone = card.cloneNode(true);
             openContainer.appendChild(clone);
        }
        else if(card.classList.contains('border-violet-500')){
            const clone = card.cloneNode(true);
            closeContainer.appendChild(clone);
        }
    })
}

const displayOpenIssues=()=>{
    allContainer.classList.add('hidden');
    closeContainer.classList.add('hidden');
    openContainer.classList.remove('hidden');
    openContainer.classList.add('grid');
}

const displayCloseIssues=()=>{
    allContainer.classList.add('hidden');
    openContainer.classList.add('hidden');
    closeContainer.classList.remove('hidden');
    closeContainer.classList.add('grid');
}

const displayIssues=()=>{
    openContainer.classList.add('hidden');
    closeContainer.classList.add('hidden');
    allContainer.classList.remove('hidden');
    allContainer.classList.add('grid');
}
