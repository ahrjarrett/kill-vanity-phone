#!/usr/bin/env node

let rl = require('readline')
let clipboard = require('copy-paste')
let map = {a:2,b:2,c:2,d:3,e:3,f:3,g:4,h:4,i:4,j:5,k:5,l:5,m:6,n:6,o:6,p:7,q:7,r:7,s:7,t:8,u:8,v:8,w:9,x:9,y:9,z:9}

interface = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
})

interface.on('line', phone => {
  let result = ''

  if(!phone.length) {
    console.log(`You've gotta give me something to convert, my dude!`)
    return
  }

  // if 1st character is a 1, remove it
  let p = phone[0] === '1' ? phone.slice(1) : phone

  p
    // strip non-numeric or non-alpha chars
    .replace(/[^a-zA-z0-9]/g, '')
    // trim to 10 digits;
    // change this if you want to support different county
    .substr(0, 10)
    .split('')
    .forEach(c =>
      result += !isNaN(parseInt(c))
	// leave alone if already a number
        ? c
        : map[c.toLowerCase()]
    )

  clipboard.copy(result)

  console.log(`
Copied to your clipboard:
${result}
`)

})

console.log('Enter vanity number to convert:')
