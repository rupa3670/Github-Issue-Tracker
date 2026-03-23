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

// issue-modal

const openModal = async (id)=>{
     const res= await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
     const data=await res.json();
     const issue=data.data;
     //title
     document.getElementById("modal-title").innerText=issue.title;

     //label
     const badgeStatus=document.getElementById("modal-status-badge")
        if (issue.status === 'open') {
            badgeStatus.innerText="Opened";
            badgeStatus.className = "bg-[#00A96E] text-white px-3 py-1 rounded-full font-bold text-xs";
        }

        else {
            badgeStatus.innerText="Closed";
            badgeStatus.className = "bg-[#A855F7] text-white px-3 py-1 rounded-full font-bold text-xs";
        }
        

      //author
     document.getElementById("modal-author").innerText=issue.author;
      //date
     document.getElementById("modal-date").innerText=new Date(issue.createdAt).toLocaleDateString();
     //description
     document.getElementById("modal-description").innerText=issue.description;
     //assignee
     document.getElementById("modal-assignee").innerText= issue.assignee || issue.author;


     //priority
     const priorityColor=document.getElementById("modal-priority");
     priorityColor.innerText=issue.priority.toUpperCase();

    
     //priority color change
     if (issue.priority == "high") {
            priorityColor.className = "bg-[#EF4444] text-white rounded-full inline-block py-1 px-3"
            
        }
        else if (issue.priority == "medium") {
            priorityColor.className = "bg-[#F59E0B]  text-white rounded-full inline-block py-1 px-3"
            
        }
        else {
            priorityColor.className = "bg-[#64748B]  text-white rounded-full inline-block py-1 px-3"
            
        }

        const labelContainer=document.getElementById("modal-labels")
        labelContainer.innerHTML="";
        issue.labels.forEach(label=>{
            let labelBg="bg-[#DEFCE8]"
            let labelText="text-[#00A96E]"
            let labelIcon=`<i class="fa-solid fa-tag"></i>`;

            if(label.toLowerCase()==="bug"){
                labelBg="bg-[#FECACA]";
                labelText="text-[#EF4444]"
                labelIcon=
                `<i class="fa-solid fa-bug"
                > </i>`
            }
           else if(label.toLowerCase()==="help wanted"){
                labelBg="bg-[#FFF8DB]";
                labelText="text-[#D97706]"
                labelIcon=
                `<i class="fa-regular fa-life-ring"></i>`
            }
            else{
                 labelBg="bg-[#DEFCE8]"
             labelText="text-[#00A96E]"
             labelIcon=`<img src="./images/Vector.png" alt="">`;
            }
            const div=document.createElement("div");
            div.className=`flex items-center px-3 py-1 ${labelBg} ${labelText} gap-1 rounded-full text-xs font semibold`
            div.innerHTML=`${labelIcon}<span>${label}</span>`

            labelContainer.appendChild(div);
        });
        document.getElementById("issue_modal").showModal();

}


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
        card.onclick=()=>openModal(issue.id);
    card.className="cursor-pointer h-full";
    
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
                <p class="text-[#64748B] text-sm mb-[10px]">${issue.description}</p>
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
             <div class="text-[#64748B] text-left">
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

document.getElementById("btn-search").addEventListener("click",()=>{
    const input=document.getElementById("input-search");
    const searchText=input.value.trim().toLowerCase();
   

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res=> res.json())
    .then((data)=>{

        const searchTexts=data.data;
       ;

        displayIssues(searchTexts)

    });
})