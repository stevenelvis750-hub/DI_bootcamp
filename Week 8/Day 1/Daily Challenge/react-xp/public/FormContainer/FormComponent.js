import React from "react";

class FormComponent extends React.Component {
  render() {
    const { data, handleChange } = this.props;

    return (
      <main style={{ padding: 20 }}>
        {/* No method/preventDefault: the browser's default GET submit puts the data in the URL */}
        <form>
          <input type="text" name="firstName" placeholder="First Name"
            value={data.firstName} onChange={handleChange} />
          <br />
          <input type="text" name="lastName" placeholder="Last Name"
            value={data.lastName} onChange={handleChange} />
          <br />
          <input type="number" name="age" placeholder="Age"
            value={data.age} onChange={handleChange} />
          <br />

          <label>
            <input type="radio" name="gender" value="male"
              checked={data.gender === "male"} onChange={handleChange} /> Male
          </label>
          <br />
          <label>
            <input type="radio" name="gender" value="female"
              checked={data.gender === "female"} onChange={handleChange} /> Female
          </label>
          <br />

          <label>
            Select your destination:{" "}
            <select name="destination" value={data.destination} onChange={handleChange}>
              <option value="">-- Please Choose a destination --</option>
              <option value="Thailand">Thailand</option>
              <option value="Japan">Japan</option>
              <option value="Brazil">Brazil</option>
            </select>
          </label>
          <br />

          <p>Dietary restrictions:</p>
          <label>
            <input type="checkbox" name="nutsFree"
              checked={data.nutsFree} onChange={handleChange} /> Nuts free
          </label>
          <br />
          <label>
            <input type="checkbox" name="lactoseFree"
              checked={data.lactoseFree} onChange={handleChange} /> Lactose free
          </label>
          <br />
          <label>
            <input type="checkbox" name="isVegan"
              checked={data.isVegan} onChange={handleChange} /> Vegan
          </label>
          <br />

          <button>Submit</button>
        </form>

        <hr />
        <h2>Entered information:</h2>
        <p>Your name: {data.firstName} {data.lastName}</p>
        <p>Your age: {data.age}</p>
        <p>Your gender: {data.gender}</p>
        <p>Your destination: {data.destination}</p>
        <p>
          Your dietary restrictions:
          <br />
          **Nuts free: {data.nutsFree ? "Yes" : "No"}
          <br />
          **Lactose free: {data.lactoseFree ? "Yes" : "No"}
          <br />
          **Vegan meal: {data.isVegan ? "Yes" : "No"}
        </p>
      </main>
    );
  }
}

export default FormComponent;