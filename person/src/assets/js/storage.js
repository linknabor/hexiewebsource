var storage = {

    set(key, value){
        if(value === undefined){
            value = [];
        }
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key){
        let value = localStorage.getItem(key);
        if(value === undefined){
            value = [];
        }
        return JSON.parse(value);
    },
    remove(key){
        localStorage.removeItem(key);
    }

}

export default storage;