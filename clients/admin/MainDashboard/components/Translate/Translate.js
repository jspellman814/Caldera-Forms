import {RemoteImage,PostCard, PostExcerpt, PostTitle} from "../../../../components/RemotePost";
import {Component} from "@wordpress/element";
import url from "../../../../components/functions/url";
import {Container, Col, Row} from "react-bootstrap";
import axios from "axios";
import {cacheAdapterEnhancer} from "axios-extensions";
import {Fragment} from "react";

function PostRow({post, link, apiRoot, imageId}) {
    return <Fragment>
        <RemoteImage imageId={imageId} link={link} apiRoot={apiRoot}/>
        <PostTitle post={post}/>
        <PostExcerpt post={post}/>
    </Fragment>;
}


export default class Translate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post1Loaded: false,
            post2Loaded: false,
            post3Loaded: false,
            post1: {},
            post2: {},
            post3: {}
        };
    }

    componentDidMount() {
        const stripTrailingSlash = (str) => {
            return str.endsWith('/') ?
                str.slice(0, -1) :
                str;
        };
        const {post1Loaded, post2Loaded, post3Loaded} = this.state;
        const {weglotApiRoot, apiRoot} = this.props;
        if (!post1Loaded) {
            axios({
                method: 'get',
                url: `${stripTrailingSlash(weglotApiRoot)}/wp/v2/posts/1021`,
                adapter: cacheAdapterEnhancer(axios.defaults.adapter, true)
            }).then((response) => {
                console.log(response);
                this.setState({
                    post1: response.data,
                    post1Loaded: true
                })

            });
        }

        if (!post2Loaded) {
            axios({
                method: 'get',
                url: `${stripTrailingSlash(apiRoot)}/wp/v2/posts/133132`,
                adapter: cacheAdapterEnhancer(axios.defaults.adapter, true)
            }).then((response) => {
                console.log(response);
                this.setState({
                    post2: response.data,
                    post2Loaded: true
                })

            });
        }


        if (!post3Loaded) {
            axios({
                method: 'get',
                url: `${stripTrailingSlash(weglotApiRoot)}/wp/v2/posts/1297`,
                adapter: cacheAdapterEnhancer(axios.defaults.adapter, true)
            }).then((response) => {
                console.log(response);
                this.setState({
                    post3: response.data,
                    post3Loaded: true
                })

            });
        }


    }


    render() {
        const {post, apiRoot, weglotApiRoot} = this.props;
        const {
            post1Loaded,
            post1,
            post2Loaded,
            post2,
            post3Loaded,
            post3,
        } = this.state;
        const link = url({}, post.link);


        return (
            <Container style={
                {'max-width': '100%'}
            }>
                <Row>
                    <Col xs={12}>
                        <PostRow post={post} link={link} apiRoot={apiRoot} imageId={141602}/>
                    </Col>

                </Row>
                <Row>
                    {post1Loaded &&
                    <Col xs={12} md={4}>
                        <PostCard
                            post={post1}
                            link={url({}, post1.link)}
                            apiRoot={weglotApiRoot}
                            imageId={post1.featured_media}
                        />
                    </Col>

                    }

                    {post2Loaded &&
                    <Col xs={12} md={4}>
                        <PostCard
                            link={url({}, post2.link)}

                            post={post2} link={link} apiRoot={apiRoot} imageId={post2.featured_media}/>
                    </Col>

                    }

                    {post3Loaded &&
                    <Col xs={12} md={4}>
                        <PostCard
                            link={url({}, post3.link)}

                            post={post3} link={link} apiRoot={weglotApiRoot} imageId={post3.featured_media}/>
                    </Col>

                    }

                </Row>


            </Container>
        )
    }

}

Translate.defaultProps = {
    weglotApiRoot: 'https://blog.weglot.com/wp-json'
};