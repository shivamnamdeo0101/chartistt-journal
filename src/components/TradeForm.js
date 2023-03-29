import { useForm, Controller } from "react-hook-form";

export default function TradeForm() {
  const { control, watch, setValue, formState: { errors } } = useForm();

  // watch the value of the 'action' field
  const action = watch("action");

  // set validation rules based on the selected action

  useEffect(() => {
    if (action === "Buy") {
      setValue("entryPrice", { required: true });
      setValue("target", { required: true, validate: value => value > watch("entryPrice") });
      setValue("stopLoss", { required: true, validate: value => value < watch("entryPrice") });
    } else if (action === "Sell") {
      setValue("entryPrice", { required: true });
      setValue("target", { required: true, validate: value => value < watch("entryPrice") });
      setValue("stopLoss", { required: true, validate: value => value > watch("entryPrice") });
    } else {
      setValue("entryPrice", {});
      setValue("target", {});
      setValue("stopLoss", {});
    }
  }, [action, watch]);



  return (
    <form>
      <Controller
        control={control}
        name="action"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <select onChange={onChange} value={value}>
            <option value="">Select an action</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        )}
      />
      {errors.action && <p>Action is required</p>}

      <Controller
        control={control}
        name="entryPrice"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div>
            <label>Entry Price</label>
            <input type="number" onChange={onChange} value={value} />
          </div>
        )}
      />
      {errors.entryPrice && <p>Entry Price is required</p>}

      <Controller
        control={control}
        name="target"
        render={({ field: { onChange, value } }) => (
          <div>
            <label>Target</label>
            <input type="number" onChange={onChange} value={value} />
          </div>
        )}
      />
      {errors.target?.type === "required" && <p>Target is required</p>}
      {errors.target?.type === "validate" && <p>Target should be greater than Entry Price</p>}

      <Controller
        control={control}
        name="stopLoss"
        render={({ field: { onChange, value } }) => (
          <div>
            <label>Stop Loss</label>
            <input type="number" onChange={onChange} value={value} />
          </div>
        )}
      />
      {errors.stopLoss?.type === "required" && <p>Stop Loss is required</p>}
      {errors.stopLoss?.type === "validate" && <p>Stop Loss should be less than Entry Price</p>}
    </form>
  );
}
