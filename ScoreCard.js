
export class ScoreCard {

    constructor (firstName, lastName, time, id, country, points) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.time = time;
        this.id = id;
        this.country = country;
        this.points = points;
    }

    createCard = () => {
        return `<div class="score_name">
                    <h4 class="first_name">${this.firstName.toUpperCase()} <span class="surname">${this.lastName.toUpperCase()}</span></h4>
                    <p class="time">${this.time.toUpperCase()}</p>
                </div>
                <div class="country">${this.country.toUpperCase()}</div>
                <div class="points">${this.points}</div>
                <div class="score_buttons">
                    <button class="control delete"><img src="images/trash-svgrepo-com.svg" alt="" class="btn_svg trash"></button>
                    <button class="control plus">+5</button>
                    <button class="control minus">-5</button>
                </div>`
    }

    minusPoints = () => {
        this.points -= 5;
    }

    plusPoints = () => {
        this.points += 5
    }

}
