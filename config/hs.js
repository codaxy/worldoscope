module.exports = {
    body: id =>
`
    <!-- Start of HubSpot Embed Code -->
    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/${id}.js"></script>
    <!-- End of HubSpot Embed Code -->
`
}
