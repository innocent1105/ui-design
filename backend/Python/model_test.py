import joblib
from prophet import Prophet

model = joblib.load("models/timeseries_6278.pkl")

future = model.make_future_dataframe(periods=5)
forecast = model.predict(future)

print(forecast[['ds', 'yhat']].tail(5))
