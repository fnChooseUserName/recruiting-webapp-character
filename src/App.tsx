import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.ts';
import Attribute, { IAttribute } from './components/Attribute/Attribute'
import Class, { IClass } from './components/Class/Class';
import Skill, { ISkill } from './components/Skill/Skill';
import Requirements from './components/Requirements/Requirements.tsx';
import { Attributes } from './types.ts';

function App() {
  const [attrValues, setAttrValues] = useState<IAttribute[]>([]);
  const [classList, updateClassList] = useState<string[]>([]);
  const [selectedClass, updateSelectedClass] = useState<string>('');
  const [selectedAttributes, updateSelectedAttributes] = useState<Attributes>();
  const [skillList, updateSkillList] = useState<ISkill[]>([]);
  const [totalSkillPoints, updateTotalSkillPoints] = useState<number>(0);

  const BASE_CLASSES = Object.keys(CLASS_LIST);

  useEffect(() => {
    const attrs: IAttribute[] = [];
    const skills: ISkill[] = [];

    ATTRIBUTE_LIST.forEach((attr) => {
      attrs.push({name: attr, baseValue: 0, modifier: -10});
    });

    SKILL_LIST.forEach((skill) => {
      skills.push({name: skill.name, modifier: skill.attributeModifier, points: 0})
    })

    setAttrValues(attrs);
    updateSkillList(skills);
  }, []);

  const incrementBaseValue = (i) => {
    let attr = ATTRIBUTE_LIST[i];
    let newState = [...attrValues];

    newState[i].baseValue++;

    if(newState[i].baseValue > 10) {
      // Modifier increase by 1 for every 2 baseValue points
      if((newState[i].baseValue - 10) % 2 === 0) newState[i].modifier++;
    } else if(newState[i].baseValue <= 10) {
      newState[i].modifier = newState[i].baseValue - 10;
    }

    UpdateSkillModifiers(newState[i].name, newState[i].modifier);

    if(attr === 'Intelligence') {
      // Update total skill points
      // 10 + (4 * Intelligence Modifier)
      let value = 10 + (4 * newState[i].modifier);
      let boundedValue = value < 0 ? 0 : value;
      updateTotalSkillPoints(boundedValue);
    }
    
    
   
    UpdateAvailableClasses(newState);
    setAttrValues(newState);
  }

  const decrementBaseValue = (i) => {
    let attr = ATTRIBUTE_LIST[i];
    let newState = [...attrValues];

    newState[i].baseValue--;

    if(newState[i].baseValue <= 10) {
      newState[i].modifier = newState[i].baseValue - 10;
    } else {
      if((newState[i].baseValue - 10) % 2 === 0) newState[i].modifier--;
    }

    if(attr === 'Intelligence') {
      // Update total skill points
      // 10 + (4 * Intelligence Modifier)
      let value = 10 + (4 * newState[i].modifier);
      let boundedValue = value < 0 ? 0 : value;
      updateTotalSkillPoints(boundedValue);
    }
    
    UpdateAvailableClasses(newState);
    setAttrValues(newState);
  }

  function UpdateSkillModifiers(modifier, value) {
    let list = [...skillList];
    let forUpdate = skillList.filter(item => item.modifier === modifier)
                            .map((skill) => ({
                              ...skill,
                              modifierValue: value
                            })) as ISkill[];

    let updates = Object.fromEntries(forUpdate.map(o => [o.name, o]));

    let newState = list.map(o => updates[o.name] || o);
    
    updateSkillList(newState);
  }

  function MeetsMinRequirements(state: object, min: Attributes) {
    for(const attr in min) {
      if(min.hasOwnProperty(attr)) {
        if(state[attr] === undefined || state[attr] < min[attr]) {
          return false;
        }
      }
    }
    return true;
  }

  function UpdateAvailableClasses(state: IAttribute[]) {
    let availableClasses = [...classList];

    let currentState = {};
    state.forEach((attr) => {
      currentState[attr.name] = attr.baseValue;
    });
    for(const [k, v] of Object.entries(CLASS_LIST)) {

      let matches = MeetsMinRequirements(currentState, v);
      if(matches) {
        if(availableClasses.indexOf(k) == -1) availableClasses.push(k);
      } else {
        availableClasses = availableClasses.filter(item => item !== k)
      }
    updateClassList(availableClasses);
  }
}

  function DisplaySelectedClass(className) {
    let sA = {};
    for(const [k, v] of Object.entries(CLASS_LIST[className])) {
      sA[k] = v;
    }
    updateSelectedAttributes(sA as Attributes);
    updateSelectedClass(className);
  }

  function CloseRequirementsView() {
    updateSelectedClass('');
  }

  function incrementSkillPoints(id) {
    if(totalSkillPoints > 0) {
      let skills = [...skillList];

      skills[id].points++;
      let newTotal = totalSkillPoints - 1;

      updateSkillList(skills);
      updateTotalSkillPoints(newTotal);
    }
  }

  function decrementSkillPoints(id) {
    if(totalSkillPoints > 0 && skillList[id].points > 0) {
      let skills = [...skillList];

      skills[id].points--;
      let newTotal = totalSkillPoints - 1;
  
      updateSkillList(skills);
      updateTotalSkillPoints(newTotal);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="Attributes-section">
          <h2>Attributes</h2> 
          { attrValues.map((attr, idx) => {
            return <Attribute key={idx}  
                              name={attr.name} 
                              baseValue={attr.baseValue} 
                              modifier={attr.modifier} 
                              handleIncrement={() => incrementBaseValue(idx)} 
                              handleDecrement={() => decrementBaseValue(idx)}
                              />
            }) 
          }
        </div>
        <div className="Classes-section">
          <h2>Classes</h2>
          {
            BASE_CLASSES.map((cl, idx) => {
              return <Class key={idx} canSelect={ classList.indexOf(cl) != -1 } name={cl} handleOnClick={(className) => DisplaySelectedClass(className)} />
            })
          }
        </div>
        <div className="Requirements-section">
          <Requirements isActive={ selectedClass !== null && selectedClass.length > 0 } data={selectedAttributes} handleOnClose={ CloseRequirementsView } />
        </div>
        <div className="Skills-section">
          <h2>Skills</h2>
          <span>Total skill points available: { totalSkillPoints }</span> 
          {
            skillList.map((skill, idx) => {
              return <Skill key={idx} 
                            name={skill.name} 
                            modifier={skill.modifier} 
                            modifierValue={skill.modifierValue} 
                            points={skill.points} 
                            handleIncrement={() => incrementSkillPoints(idx) } 
                            handleDecrement={() => decrementSkillPoints(idx) } 
                            />
            })
          }
        </div>
      </section>
    </div>
  );
}

export default App;
