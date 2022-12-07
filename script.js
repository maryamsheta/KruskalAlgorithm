class Graph
{
    constructor(vertices)
    {
        this.V = vertices
        this.graph = []
    }

    addEdge(w,src,dest) {
        this.graph.push([w,src,dest])
    }

    find(parent, i) {
        if (parent[i] == i)
            return i
            
        return this.find(parent, parent[i])
    }
  
    union(parent,rank, x, y) {
        let xroot = this.find(parent, x)
        let yroot = this.find(parent, y)
        if(rank[xroot]<rank[yroot]) {
            parent[xroot] = yroot
        } else if(rank[xroot]>rank[yroot]) {
            parent[yroot] = xroot
        } else {
            parent[yroot] = xroot
            rank[xroot] +=1
        }
    }

    kruskal() {
        let i = 0
        let e = 0
        let result = []
        let parent = []
        let rank = []
        let sorted = []
        sorted = this.graph.sort()
        for(let i=0;i<this.V;i++) {
            parent.push(i)
            rank.push(0)
        }
        while (e < this.V - 1) {
            let w = sorted[i][0]
            let src = sorted[i][1]
            let dest = sorted[i][2]
            i+=1
            let x = this.find(parent,src)
            let y = this.find(parent,dest)
            if (x!==y) {
                e+=1
                result.push([w,src,dest])
                this.union(parent,rank,x,y)
            }
        }
        return result
    }
}

const root    = document.querySelector(":root")
const infoBtn = document.querySelector(".info")
const quitbtn = document.querySelector(".quit")
const popup   = document.querySelector(".popup")
const kruskal = document.querySelector("button")
const numbers = document.querySelectorAll(".numbers .number")
const reveal  = document.querySelector(".result")
const cost    = document.querySelector(".cost")

infoBtn.addEventListener("click", ()=> popup.style.display = "flex")
quitbtn.addEventListener("click", ()=> popup.style.display = "none")

function generateRandomTheme() {
    return `hsl(${Math.floor(Math.random()*360)},50%,50%)`
} 

function generateRandomNumber() {
    return Math.floor(Math.random()*9+1)
}

window.addEventListener("DOMContentLoaded",()=> {root.style.setProperty("--main-theme",generateRandomTheme())})


let weights = []
numbers.forEach(number=> {
    const randomNum = generateRandomNumber()
    number.innerText = randomNum
    weights.push(randomNum)
})


kruskal.addEventListener("click",()=> {
    let g =new Graph(6)
    g.addEdge(weights[0],2,4)
    g.addEdge(weights[0],4,2)
    g.addEdge(weights[1],3,6)
    g.addEdge(weights[1],6,3)
    g.addEdge(weights[2],4,5)
    g.addEdge(weights[2],5,4)
    g.addEdge(weights[3],1,2)
    g.addEdge(weights[3],2,1)
    g.addEdge(weights[4],1,3)
    g.addEdge(weights[4],3,1)
    g.addEdge(weights[5],6,5)
    g.addEdge(weights[5],5,6)
    g.addEdge(weights[6],2,6)
    g.addEdge(weights[6],6,2)
    g.addEdge(weights[7],4,6)
    g.addEdge(weights[7],6,4)
    g.addEdge(weights[8],3,2)
    g.addEdge(weights[8],2,3)
    g.addEdge(weights[9],4,6)
    g.addEdge(weights[9],6,4)
    const result = g.kruskal()
    let total = 0
    result.forEach(flow => {
        let w = flow[0]
        let src = flow[1]
        let dest = flow[2]
        switch(src) {
            case 1:
                src="A"
                break
            case 2:
                src="B"
                break
            case 3:
                src="C"
                break
            case 4:
                src="D"
                break
            case 5:
                src="E"
                break
            case 6:
                src="F"
                break                       
        }
        switch(dest) {
            case 1:
                dest="A"
                break
            case 2:
                dest="B"
                break
            case 3:
                dest="C"
                break
            case 4:
                dest="D"
                break
            case 5:
                dest="E"
                break
            case 6:
                dest="F"
                break                       
        }
        reveal.innerHTML += `${src}->${dest} <br>` 
        total += parseInt(w) 
    })
    cost.innerText = `Total Cost: ${total}`
    kruskal.disabled = true
})



