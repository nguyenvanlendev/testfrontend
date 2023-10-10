import './OptionItem.scss';
import { TickIcon } from '../../../assets/svg/TickIcon';

export const OptionItem = ({ value, onClick, isChosen }: { value: string; onClick: any; isChosen: boolean }) => {
  return (
    <div className="option-item" onClick={onClick}>
      <div className="option-item__value" style={{ fontWeight: isChosen ? '700' : '300' }}>
        {value}
      </div>
      {isChosen && (
        <div className="option-item__tick">
          <TickIcon />
        </div>
      )}
    </div>
  );
};
