/* label the images, just for convenience, to visually track them */
const images = document.querySelectorAll('.imageClass');
const PicArray = Array.from(images);
PicArray.forEach((element) => {
    console.log(element)
    })

/* configuration */
let width = 130; // image width
let count = 3; // visible images count

let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');

let position = 0; // ribbon scroll position

carousel.querySelector('.prev').onclick = function() {
  // shift left
  position += width * count;
  // can't move to the left too much, end of images
  position = Math.min(position, 0)
  list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function() {
  // shift right
  position -= width * count;
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
};