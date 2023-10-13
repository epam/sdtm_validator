import { useEffect } from 'react';

import { ERROR_MESSAGES } from '@common';
import { ERROR_TITLES, REPORT_CONTENTS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { startNewValidationAction } from '@redux';
import { ReportDetailsType } from '@types';
import { PrimaryButton, Spinner, TextButton } from '@ui-kit';

import {
  Content,
  ErrorText,
  ErrorTitle,
  ErrorWrapper,
  Label,
  LoadingWrapper,
  ReportDetailsTitle,
  ReportDetailsWrapper,
  Title,
  Toolbar,
  Value,
  Wrapper
} from './parts';

const Loading = () => (
  <LoadingWrapper>
    <Spinner size={80} />
  </LoadingWrapper>
);

const ErrorMessage = () => (
  <ErrorWrapper>
    <ErrorTitle>{ERROR_TITLES.reportDetailsError}</ErrorTitle>
    <ErrorText>{ERROR_MESSAGES.reportDetailsError}</ErrorText>
  </ErrorWrapper>
);

type ReportDetailProps = {
  label: string;
  value: string | number;
};

const ReportDetail = ({ label, value }: ReportDetailProps) => (
  <>
    <Label>{label}:</Label>
    <Value>{value}</Value>
  </>
);

type ReportDetailsProps = {
  reportDetails: ReportDetailsType;
};

const ReportDetails = ({ reportDetails }: ReportDetailsProps) => {
  const renderReportDetails = (reportDetails: ReportDetailsType) =>
    REPORT_CONTENTS.map(({ label, valueKey }) => <ReportDetail key={label} label={label} value={reportDetails[valueKey]} />);

  return <ReportDetailsWrapper>{renderReportDetails(reportDetails)}</ReportDetailsWrapper>;
};

type ViewReportSectionProps = {
  reportDetails: ReportDetailsType | null;
  isLoading: boolean;
  isSaving: boolean;
  saveAndOpenReport: (reportId: string) => () => void;
  getReportDetails: (reportId: string) => Promise<void>;
};

export const ViewReportSection = ({ isLoading, isSaving, reportDetails, saveAndOpenReport, getReportDetails }: ViewReportSectionProps) => {
  const dispatch = useAppDispatch();

  const reportId = useAppSelector((state) => state.validation.reportId);

  const onStartNew = () => {
    dispatch(startNewValidationAction());
  };

  const requestReportDetails = () => {
    getReportDetails(reportId);
  };

  useEffect(() => {
    requestReportDetails();
  }, []);

  return (
    <Wrapper>
      <Title>View Report</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Content>
            <ReportDetailsTitle>The report is ready</ReportDetailsTitle>
            {reportDetails ? <ReportDetails reportDetails={reportDetails} /> : <ErrorMessage />}
            <Toolbar>
              <PrimaryButton disabled={isSaving} title="Save and Open" onClick={saveAndOpenReport(reportId)} />
              <TextButton title="Start New Validation" onClick={onStartNew} />
            </Toolbar>
          </Content>
        </>
      )}
    </Wrapper>
  );
};
