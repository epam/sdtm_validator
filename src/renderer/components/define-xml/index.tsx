import { useAppSelector } from '@hooks';
import { CloseIcon, IconButton, OutlinedButton, Tooltip } from '@ui-kit';

import { Browse, Content, Error, Errors, Path, Wrapper } from './parts';

type DefineXmlProps = {
  chooseDefineXml: () => Promise<void>;
  removeDefineXml: () => void;
  isValidating: boolean;
  errors: string[];
};

export const DefineXml = ({ errors, isValidating, chooseDefineXml, removeDefineXml }: DefineXmlProps) => {
  const defineXmlPath = useAppSelector((state) => state.defineXml);

  const renderErrors = (errors: string[]) => errors.map((error) => <Error key={error}>{error}</Error>);

  return (
    <Wrapper>
      <Browse>
        <OutlinedButton disabled={isValidating} title="Browse Define.xml" onClick={chooseDefineXml} />
      </Browse>
      <Content $disabled={isValidating} $error={!!errors.length}>
        <Tooltip title={isValidating ? '' : defineXmlPath}>
          <Path>{defineXmlPath}</Path>
        </Tooltip>
        {defineXmlPath && (
          <Tooltip title="Remove Item">
            <IconButton disabled={isValidating} icon={<CloseIcon />} onClick={removeDefineXml} />
          </Tooltip>
        )}
      </Content>
      {!!errors.length && <Errors>{renderErrors(errors)}</Errors>}
    </Wrapper>
  );
};
