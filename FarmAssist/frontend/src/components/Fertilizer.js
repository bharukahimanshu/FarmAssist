import React from "react";
import "../css/cr.css";
import state_arr from "./state.json";
import FertilizerResult from "./FertilizerResult";
import { FertilizerPredict } from "../api/FertilizerPredict";
function CropRecommend() {
  var season = ["Summer", "Kharif", "Autumn", "Rabi", "Winter", "Annual"];
  const [state, setState] = React.useState("Select State");
  const [show, setShow] = React.useState(false);
  const [prediction, setPrediction] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [rainfall, setRainfall] = React.useState("");
  const handleChange = (event) => {
    setState(event.target.value);
  };

  const [formdata, setFormdata] = React.useState({
    nitrogen: "",
    phosphorous: "",
    pottasium: "",
    ph: "",
    season: "",
    soil: "",
    moisture: "",
    crop: "",
    city: "",
  });
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevValue) => {
      return {
        ...prevValue,
        [name]: value.trim(),
      };
    });
  };
  const handlePredict = (event) => {
    event.preventDefault();
    const res = FertilizerPredict(formdata);
    res.then((data) => {
      setTemperature(data.response.result.temperature + " °C");
      setHumidity(data.response.result.humidity + " %");
      setRainfall(data.response.result.rainfall + " mm");
      setShow(true);
      setPrediction(data.response.result.prediction);
    });
  };
  const handleReset = (event) => {
    event.preventDefault();
    document.getElementById("formdata").reset();
    setState("Select State");
    setShow(false);
  };

  return (
    <>
      <div className="cr">
        <form id="formdata">
          <div className="form-group">
            <label htmlFor="Nitrogen">
              <b>Nitrogen content (in %)</b>
            </label>
            <input
              type="number"
              className="form-control"
              id="Nitrogen"
              name="nitrogen"
              placeholder="Enter the value"
              required
              onChange={handleFormChange}
              autoFocus
              min={0}
              max={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Phosphorous">
              <b>Phosphorous content (in %)</b>
            </label>
            <input
              type="number"
              className="form-control"
              id="Phosphorous"
              name="phosphorous"
              placeholder="Enter the value"
              required
              min={0}
              max={100}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Pottasium">
              <b>Pottasium content (in %)</b>
            </label>
            <input
              type="number"
              className="form-control"
              id="Pottasium"
              name="pottasium"
              placeholder="Enter the value"
              required
              min={0}
              max={100}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ph">
              <b>ph level</b>
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="ph"
              name="ph"
              placeholder="Enter the value"
              required
              min={0}
              max={14}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="soil">
              <b>Soil Type</b>
            </label>
            <select
              id="soil"
              className="form-control"
              name="soil"
              required
              onChange={handleFormChange}
            >
              <option value="-1">Select Soil</option>
              <option value="0">Black</option>
              <option value="1">Clayey</option>
              <option value="2">Loamy</option>
              <option value="3">Red</option>
              <option value="4">Sandy</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="moisture">
              <b>Soil Moisture (in %)</b>
            </label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              id="moisture"
              name="moisture"
              placeholder="Enter the value"
              required
              min={0}
              max={100}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="crop">
              <b>Crop Type</b>
            </label>
            <select
              id="crop"
              className="form-control"
              name="crop"
              required
              onChange={handleFormChange}
            >
              <option value="-1">Select Crop</option>
              <option value="0">Barley</option>
              <option value="1">Cotton</option>
              <option value="2">Ground Nuts</option>
              <option value="3">Maize</option>
              <option value="4">Millet</option>
              <option value="5">Oil Seeds</option>
              <option value="6">Paddy</option>
              <option value="7">Pulses</option>
              <option value="8">Sugercane</option>
              <option value="9">Tobacco</option>
              <option value="10">Wheat</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="season">
              <b>Crop Season</b>
            </label>
            <select
              id="season"
              className="form-control"
              name="season"
              required
              onChange={handleFormChange}
            >
              <option value="-1">Select Season</option>
              {season.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="State">
              <b>State</b>
            </label>
            <select
              id="sts"
              name="stt"
              className="form-control"
              onChange={handleChange}
              required
            >
              {Object.keys(state_arr).map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="city">
              <b>City</b>
            </label>
            <select
              id="city"
              className="form-control"
              name="city"
              required
              onChange={handleFormChange}
            >
              <option value="">Select City</option>
              {state_arr[state].map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="temp">
              <b>Temperature (in °C)</b>
            </label>
            <input
              className="form-control"
              id="temp"
              name="temp"
              placeholder="Temperature"
              disabled
              value={temperature}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hum">
              <b>Humidity (in %)</b>
            </label>
            <input
              className="form-control"
              id="hum"
              name="hum"
              placeholder="Humidity"
              disabled
              value={humidity}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rain">
              <b>Rainfall (in mm)</b>
            </label>
            <input
              className="form-control"
              id="rain"
              name="rain"
              placeholder="Rainfall"
              disabled
              value={rainfall}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-info crbtn"
              onClick={handlePredict}
            >
              Predict
            </button>
            <button
              type="reset"
              className="btn btn-danger crbtn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          {show && (
            <>
              <FertilizerResult
                prediction={prediction}
                show={show}
                setShow={setShow}
                body={` <p>The details of the fertilizer recommendation are as follows:</p><ul><li>Nitrogen level: ${formdata.nitrogen} %</li><li>Phosphorus level: ${formdata.phosphorous} %</li><li>Potassium level: ${formdata.pottasium} %</li><li>pH level: ${formdata.ph}</li><li>Season: ${formdata.season}</li><li>Soil type: ${formdata.soil}</li><li>Moisture content: ${formdata.moisture} %</li><li>Crop type: ${formdata.crop}</li><li>City: ${formdata.city}</li><li>Temperature: ${temperature}</li><li>Humidity: ${humidity}</li><li>Rainfall: ${rainfall}</li></ul>    <p>
      Recommended Fertilizer: ${prediction.data}
    </p>
    <p>
      We believe that this fertilizer will help you achieve the best possible results for your crops. 
    </p>
    <p>
      Thank you for using our fertilizer recommendation service on QuickCrop. We are committed to helping you grow healthy and sustainable crops, and we hope that this recommendation will be beneficial to you.
    </p>
`}
              />
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default CropRecommend;
