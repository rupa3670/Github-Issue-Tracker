let allIssues = [];
//fetch data
const loadIssue = () => {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayIssues(data.data)
        }
        )
};


//button toggling
const btnAll = document.getElementById("btn-all")
const btnOpen = document.getElementById("btn-open")
const btnClosed = document.getElementById("btn-closed")

const toggleBtnColor = (activeBtn) => {
    const buttons = [btnAll, btnClosed, btnOpen];
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary', 'text-white')
        btn.classList.add('btn-outline', 'text-[#64748B]')
    });
    activeBtn.classList.add('btn-primary', 'text-white')
    activeBtn.classList.remove('btn-outline', 'text-[#64748B]')
};

btnAll.addEventListener('click', () => {
    toggleBtnColor(btnAll);
    displayIssues(allIssues);
    document.getElementById("issue-count").innerText = `${allIssues.length} Issues`;
});
btnOpen.addEventListener('click', () => {
    toggleBtnColor(btnOpen);
    const openIssue = allIssues.filter(issue => issue.status == 'open')
    displayIssues(openIssue);
    document.getElementById("issue-count").innerText = `${openIssue.length} Issues`;
});
btnClosed.addEventListener('click', () => {
    toggleBtnColor(btnClosed);
    const ClosedIssue = allIssues.filter(issue => issue.status == 'closed')
    displayIssues(ClosedIssue);
    document.getElementById("issue-count").innerText = `${ClosedIssue.length} Issues`;
});

//1. get the container & empty
const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issues-container")
    issueContainer.innerHTML = "";

    //2. get into every lesson
    issues.forEach(issue => {
        let borderColor = "";
        if (issue.status === 'open') {
            borderColor = 'border-[#00A96E]';
        }

        else {
            borderColor = 'border-[#A855F7]';
        }

        let priorityText = ""
        let priorityBg = ""
        if (issue.priority == "high") {
            priorityText = 'text-[#EF4444]'
            priorityBg = 'bg-[#FEECEC]'
        }
        else if (issue.priority == "medium") {
            priorityText = 'text-[#F59E0B]'
            priorityBg = 'bg-[#FFF6D1]'
        }
        else {
            priorityText = 'text-[#64748B]'
            priorityBg = 'bg-[#EEEFF2]'
        }

        if (issue.status == 'open') {

        }


        //3. create element
        const dateRaw = issue.createdAt;
        const displayDate = new Date(dateRaw).toLocaleDateString();
        const card = document.createElement("div")
        card.innerHTML = `
     <div class="bg-white p-4 rounded-[8px] border-t-4 ${borderColor} shadow-sm h-full flex flex-col justify-between  ">
                <div class="flex justify-between">
               <div  class="${issue.status === 'open' ? 'bg-[#CBFADB] text-green-700' :
                'bg-[#F0E2FF] text-[#A855F7] rounded-full p-[2px]'} rounded-full">
                 <i  class="${issue.status === 'open' ? 'fa-solid fa-spinner' : 'fa-regular fa-circle-check'}"></i>
               </div>
                <h4 class="inline-block ${priorityText} ${priorityBg} py-1 px-6 rounded-full font-semibold">${issue.priority}</h4>
            </div>
            
                <div class="mt-[15px] ">
                    <h3 class="font-semibold  mb-2">${issue.title}</h3>
                <p class="text-[#64748B] text-sm line-clamp-2 mb-[10px]">${issue.description}</p>
                </div>
            
            <div class="flex flex-wrap gap-2 justify-between mb-[15px]">
            ${issue.labels.map(label => {
                    let bgColor = "bg-[#DEFCE8]"
                    let textColor = "text-[#00A96E]"
                    let icon = ` <img src="./images/Vector.png" alt="">`
                    const lowerLevel = label.toLowerCase()
                    {
                        if (lowerLevel === 'bug') {
                            bgColor = "bg-[#FECACA]";
                            textColor = "text-[#EF4444]"
                            icon = ` <i class="fa-solid fa-bug"></i>`
                        }
                        else if (lowerLevel === 'help wanted') {
                            bgColor = "bg-[#FFF8DB]";
                            textColor = "text-[#D97706]";
                            icon = `<i class="fa-regular fa-life-ring"></i>`
                        }
                        return `
                <div class="flex items-center gap-[3px] ${bgColor} ${textColor} px-2.5 py-1  rounded-full text-[10px] font-bold uppercase border border-current ">${icon}<span>${label}</span>
                </div>
                
                    `

                    }
                }).join('')}</div>
               
            <hr class="border-gray-300 mb-[15px]">
             <div class="text-[#64748B]">
            <p >#${issue.id} by <span>${issue.author}</span></p>
            <p>${displayDate}</p>
        </div>
        </div>
    
    `
        //4. append into container
        issueContainer.append(card);
    })

};
loadIssue();