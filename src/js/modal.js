const btnOpenModal  = document.querySelector('#open');
const itemAll = document.querySelectorAll('.road-map__item');
const sityDiv = document.querySelector('.road-map__sity');

const arrModalItemsAll = [
    {
        year: '2019',
        title: 'начало разработки',
        text: 'алгоритма прогнозирования многомерных временных последовательностей',
    },
    {
        year: '2020',
        title: 'применение нейронных сетей',
        text: 'для классификации и прогнозирования данных',
    },
    {
        year: '2021',
        title: 'получен опытный рабочий комплекс',
        text: 'успешно прогнозирующий поведение криптоактивов',
    },
    {
        year: '2022',
        title: 'разработка рабочей версии ',
        text: 'продукта, запуск бета теста',
    },
    {
        year: '2023',
        title: 'начало продаж',
        text: 'продукта, разработка серии нейросетей и создание маркеплейса',
    },
    {
        year: '2024',
        title: 'проведение IDO',
        text: 'NFT-токены нейросетей для прогнозирования свободно обращаются на маркетплейсе, теперь вы можете купить понравившуюся вам нейросеть в виде NFT токена и продавать к нему доступ получая комиссию.',
    },
]

itemAll.forEach((item)=>{
    item.addEventListener('click', (event)=>{
        const {target} = event;
        const dataYear = target.getAttribute('data-year');
        if(dataYear){
            checkAndAddModal(dataYear);
        }
    });
});

sityDiv.addEventListener('click', (event)=>{
    const btnCloseModal = event.target.closest('#close');
    const btnNextModal = event.target.closest('#next-year');
    const btnPrevModal = event.target.closest('#prev-year');
    const currentModal = document.querySelector('.modal');
    let data = currentModal.getAttribute('data-year');
    if(btnCloseModal){
        currentModal.remove();
    }
    else if(btnNextModal){
        data = Number(data) + 1;
        data = String(data);
        checkAndAddModal(data);
    }
    else if(btnPrevModal){
        data = Number(data) - 1;
        data = String(data);
        checkAndAddModal(data);
    }
})

function checkAndAddModal(dataYear){
    let modalItem;
    const currentModal = document.querySelector('.modal');
    
    //Если элемента нет на странице, то выводим его
    if(!currentModal){
        addModalItem(modalItem, dataYear);
    }
    else{
        //если нажали повторно на элемент, то закрываем
        if(currentModal.classList.contains(`year-${dataYear}`)){
            currentModal.remove();
        }
        //если нажали на другой элемент, то закрываем и выводим новый
        else{
            currentModal.remove();
            addModalItem(modalItem, dataYear);
        }
    }
}

function addModalItem(modalItem, dataYear){
    for(let i=0; i < arrModalItemsAll.length; i++){
        if(dataYear === arrModalItemsAll[i].year){
            modalItem = getModalItem(dataYear, i);
        }
    }
    sityDiv.append(modalItem);
}

function getModalItem (year, index){
    //получаем значения для блока из массива
    const title = arrModalItemsAll[index].title;
    const text = arrModalItemsAll[index].text;
    //создаем элемент
    let item = document.createElement('div');
    //задаем ему классы
    item.classList.add('modal');
    item.classList.add(`year-${year}`);
    item.classList.add('b-show'); //для плавного появления блока на экране

    item.setAttribute('data-year', year);

    item.innerHTML =  `
    <div class="modal__wrapper">
        <button class="modal__close-btn" id="close">✖</button>
        <div class="modal__year">${year}</div>    
        <div class="modal__title">${title}</div>
        <div class="modal__text">${text}</div>
        <button class="modal__btn ${year === '2019' ? 'dp-n' : ''}" id="prev-year">←</button>
        <button class="modal__btn ${year === '2024' ? 'dp-n' : ''}" id="next-year">→</button>
    </div>
    `
    return item
}