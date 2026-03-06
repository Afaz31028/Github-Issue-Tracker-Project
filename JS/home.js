
const loadAllIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(issues => displayAllIssues(issues.data))
}
loadAllIssues();

const displayAllIssues = (issues) => {
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";

    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.innerHTML = `
            <div class="card p-4 max-w-[256.5px] shadow-2xl border-t-4 border-green-500 rounded-lg">
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
                    <div id="issue-labels" class="flex gap-3 items-center mt-3">
                        ${displayLabels(issue.labels)}
                    </div>
                    <hr class="mt-4 opacity-20">
                    <p class="mt-3 text-[#64748B] text-sm">#1 <span>john_doe</span></p>
                    <p class="mt-3 text-[#64748B] text-sm">1/15/2024</p>
                </div>
        `
        issuesContainer.appendChild(issueCard);
    })
}

const displayLabels=(issueLabels)=>{
   let labelsHTML = "";
    issueLabels.forEach(label => {
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
                <h3 class="text-green-600-600 text-sm font-normal">ENHANCEMENT</h3>
            </div>`
        }
        else if(label==='good first issue'){
            labelsHTML+=`
            <div class="px-3 py-1 bg-lime-200 rounded-xl">
                <h3 class="text-lime-600 text-sm font-normal">GOOD FIRST</h3>
            </div>`
        }
    });
    return labelsHTML;
}