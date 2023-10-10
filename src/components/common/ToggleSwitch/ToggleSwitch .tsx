import './ToggleSwitch.scss';
const ToggleSwitch = (props: { isToggled: any; onToggle: any }) => {
  const { isToggled, onToggle } = props;
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
};

export default ToggleSwitch;
