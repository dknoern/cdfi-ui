import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Badge, Statistic } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { cdfiServices } from './services';

const { Title, Paragraph } = Typography;

const HotCdfis = () => {
  const [cdfis, setCdfis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await cdfiServices.getTopCdfis();
        setCdfis(data);
      } catch (error) {
        console.error('Error fetching CDFIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hot-cdfis-container">
      <Title level={2}>
        <FireOutlined style={{ color: '#ff4d4f', marginRight: '12px' }} />
        Hot CDFIs
      </Title>
      <Paragraph>
        Featuring the top three CDFI loan companies based on total assets.
      </Paragraph>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {cdfis.map((cdfi) => (
            <Col xs={24} md={8} key={cdfi.id}>
              <Card 
                hoverable
                className="cdfi-card"
                title={
                  <div>
                    <Badge status={cdfi.badgeType || 'success'} />
                    {cdfi.name}
                  </div>
                }
              >
                <Statistic
                  title="Total Assets"
                  value={cdfi.totalAssets}
                  precision={0}
                  prefix="$"
                  suffix=""
                  valueStyle={{ color: '#3f8600' }}
                />
                <Statistic
                  title="Rating"
                  value={cdfi.rating || 'N/A'}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Paragraph ellipsis={{ rows: 3 }}>
                  {cdfi.description || 'No description available.'}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HotCdfis;