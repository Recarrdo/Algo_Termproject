import create from 'zustand' // create로 zustand를 불러옵니다.

const useStore = create(set => ({
    openModal : false,
    x : 0,
    y : 0,
    firstW : null,
    secondW : null,
    dataArr : [],


    SetOpenModal : () =>{
        set(state => ({openModal : !state.openModal}))
    },

    SetX : (e) =>{
        set({x : e})
    },

    SetY : (e) =>{
        set({y : e})
    },

    SetFirstWeight : (e) =>{
        set({firstW : e.target.value})
    },
    

    SetSecondWeight : (e) =>{
        set({secondW : e.target.value})
    },
    
    SetInit : () =>{
        set({firstW : null})
        set({secondW : null})
    },
    

    setDataArr : (arr, x, y, firstW, secondW) =>{
        const send = {
            x: "",
            y: "",
            firstW: "",
            secondW: "",
        }
        send.x = x;
        send.y = y;
        send.firstW = firstW;
        send.secondW = secondW;
        let temp = arr;
        temp.push(send);

        set({dataArr : temp})
    }, 
    
    clearDataArr : () =>{
        set({dataArr : []});
    },
    
}))


export default useStore;