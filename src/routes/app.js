let halu=false
function reverseString(str) {
    let str1 = ''
    for (i = 0; i <str.length; i++){
        str1 += str[i]
        if (str[i] == ' ') {
           str1[0]+=str[i]
        
        }

    
    }
    return str1
    
}

console.log(reverseString("hello world"))