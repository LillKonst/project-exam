export default function CreateVenue() {
  return (
    <form>
      <h2>REGISTER YOUR VENUE</h2>
      <label>Title:</label>
      <input type="title" />
      <label>Address:</label>
      <input />
      <label>Description:</label>
      <input type="textarea" />
      <div>
        <h3>This place offers:</h3>
        <select>WIFI</select>
        <select>Parking</select>
        <select>Breakfast</select>
        <select>Pets allowed yes/no</select>
      </div>
      <label>Max Guests:</label>
      <select>Number of guests</select>
      <label>Image URL:</label>
      <input type="url" />
      <button type="submit">ADD</button>
      <div>
        <img className="show image" />
        <div className="image-row if several images">
          <p>display row of images</p>
        </div>
        <button>CREATE VENUE</button>
      </div>
    </form>
  );
}
