/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes, id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of child nodes.
    this.children = children; // All children are of type Node
    //id
    this.id = id;
  }

  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  *
  * 3.
  * <div> 
  *   <span id="span-1" class="note></span>
  *   <span id="span-2"></span>
  *   <span id="span-3"></span>
  *   <article>
  *     <div>
  *       <span id="span-3"></span>
  *     </div>
  *   </article>
  * </div>
  * Selector `.note ~ span` should return two span nodes.
  * span-1 -> span-2.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  search(selector) {

    /**
     * Error Handling
     */
    if (selector == null) {
      return "Invalid selector provided"
    }

    if (selector.length == 0) {
      return "Invalid input for selector provided"
    }

    if (typeof (selector) != "string") {
      return "Invalid input for selector provided"
    }
    try {
      return this.recursiveSearch(selector, this, [])
    }
    catch (errorThrown) {
      console.log(errorThrown)
    }
  }

  //Recursive Search function
  /*
  * @param {string, node, array} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  recursiveSearch(selector, nodeParent, result) {
    //for loop to traverse for children
    for (let i = 0; i < nodeParent.children.length; i++) {
      //Ternary operator used to check (syntax : condition ? exprIfTrue : exprIfFalse) 
      //classes.includes ==> will return true if provided selecotr is found inside the current class
      //selector.slice ==> used to slice the string (example : selector =
      // ".randomSpan" => selector.slice(1, selector.length => "randomSpan")
      (selector == nodeParent.children[i].tag || nodeParent.children[i].classes.includes(selector.slice(1, selector.length)))
        //if the operation holds true then push the current child at ith position to array
        ? result.push(nodeParent.children[i].id)
        // if the operation holds false then push null
        : null;

      (nodeParent.children.length)
        // Run the recursion function again
        ? result = this.recursiveSearch(selector, nodeParent.children[i], result)
        : null;
    }
    //return result array with all children nodes found in search
    return result;
  }
}

/*
* Variable Declaration : Node(tag, children, classes,id)
*/
let lbl1 = new Node('label', [], [], 'lbl-1');
let sec1 = new Node('section', [lbl1], [], 'sec-1')
let randomNode = new Node('span', [], ['randomSpan'], 'span-6');
let p1 = new Node('p', [], ['sub1-p1', 'note'], 'para-1');

let span1 = new Node('span', [], ['note'], 'span-1');
let span2 = new Node('span', [], [], 'span-2');
let span3 = new Node('span', [], ['sub1-span3'], 'span-3');
let span4 = new Node('span', [], ['mania'], 'span-4');
let span5 = new Node('span', [], ['note', 'mania'], 'span-5');

let divNode3 = new Node('div', [sec1], ['subContainer2'], 'div-3');
let divNode2 = new Node('div', [p1, span3], ['subContainer1'], 'div-2');
let divNode4 = new Node('div', [span4, span5], [], 'div-4');
let divNode1 = new Node('div', [span1, span2, divNode2, divNode3, divNode4], ['mainContainer'], 'div-1');

let body = new Node('body', [divNode1, randomNode], [], ['content'])

//Test Cases
console.log("Test Started...");
// Test case 1 -
console.log("Test case No : 1")
console.log(divNode1.search("span"));

// Test case 2 -
console.log("Test case No : 2")
console.log(divNode1.search(".note"));

// Test case 3 -
console.log("Test case No : 3")
console.log(divNode1.search("label"));

// Test case 4 -
console.log("Test case No : 4")
console.log(p1.search(".note"));

// Test case 5 -
console.log("Test case No : 5")
console.log(divNode1.search("div"));

// Test case 6 -
console.log("Test case No : 6")
console.log(randomNode.search("div"));

// Test case 7 -
console.log("Test case No : 7")
console.log(divNode2.search("section"));

// Test case 8 -
console.log("Test case No : 8")
console.log(body.search());

// Error conditions and invalid input need to be handled
// Test case 9 -
console.log("Test case No : 9")
console.log(body.search("section"));

// Test case 10 -
// randomSpan is span outside after divNode1 closed
console.log("Test case No : 10")
console.log(divNode1.search(".randomSpan"));

console.log("Test Ended...");

/* Code Explanantion
1. Recursive Search Function : This is a secondary function which is reponsible for the search functionality for the program.
  Function Definition : recursiveSearch(selector, nodeParent, [])
   {
    1. selector-string is the parameter provided by the user for search operation
    2. nodeParent is the instance towards the current object. It will be responsible for object details.
    3. an empty array to store the results of search
   }
  
  Function Body : 
    1. For loop to iterate through the node list of the parent from 0th position to praent-node.length.
    2. Check if selector is preesent in the provided class Node.
    3. For the class selector I have used .includes in-build method of array-class.
          is true if the variable is inside the array 
          is false otherwise
    4. After loop-iteration I have recursively called the function with parameters this.recursiveSearch(selector, nodeParent.children[i], result)

2. Error Handling :
   For error handling I have added three different scenarios alongwith try-catch block in the main search function.
   1. selector == null : If no selector input value is provided
   2. selector != String : If provided selector is not a string
   3. selector == 0 : if empty selector string is provided

*/